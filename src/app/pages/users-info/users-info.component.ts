import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';


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



  currentUser() {
    this.userService.currentUser(this.activeId).subscribe((res) => {
      this.currentUsr = res;

      res.friends.forEach(x => {
        console.log(x)
        this.userService.currentUser(x).subscribe( res => {
          
          this.userFriends.push(res)
          console.log(this.userFriends)
        })
      })
      
     
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

        this.currentUser()
      }
    }
  }

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
    this.currentUser();
  }


}
