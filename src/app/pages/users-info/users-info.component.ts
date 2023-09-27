import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, concat, of } from 'rxjs';
import { concatMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute
  ) { }

  activeId!: number;
  userFriends: IUsers[] = [];
  currentUsr?: IUsers;
  loading = false;
  page = 1;

  currentUser() {
    this.userService.currentUser(this.activeId).subscribe((res) => {
      this.currentUsr = res;
      this.getUserFriends(res.friends);
    });
  }

  getUserFriends(friendIds: any[]) {
    const observables: Observable<IUsers>[] = [];

    friendIds.forEach((friendId) => {
      const friendObservable = this.userService.currentUser(friendId);
      observables.push(friendObservable);
    });

    concat(...observables)
      .pipe(toArray()) // Collect all results into an array
      .subscribe((friends) => {
        this.userFriends = friends;
      });
  }

  @HostListener('window:scroll', ['$event'])
onScroll(event: any) {
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const threshold = scrollHeight - windowHeight - 100; 

  if (scrollY >= threshold) {
    if (!this.loading) {
      this.page++;
     this.fetchMoreData()
    }
  }
}

fetchMoreData() {
  if (!this.loading) {
    this.loading = true;
    // Assuming your API supports pagination, update the page number as needed
    const nextPage = this.page + 1;

    this.userService.getUsers(nextPage).subscribe((res) => {
      // Append the newly fetched friends to the existing array
      this.userFriends = this.userFriends.concat(res);
      this.page = nextPage; // Update the current page
      this.loading = false; // Reset the loading flag
    });
  }
}


  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
    this.currentUser();
  }
}
