import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {

  activeId: any;
  userFriends: IUsers[] = [];
  currentUsr: IUsers | null = null;
  loading = false;
  page = 1;
  deletedFriendsid! : number  

  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog

  ) {}


  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
   
    this.currentUser();
  }

  currentUser() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.userService.currentUser(this.activeId).subscribe((res) => {
      this.currentUsr = res;
    
      const friendsPerPage = 5;
      const start = (this.page - 1) * friendsPerPage;
      const end = this.page * friendsPerPage;

      const friendsToLoad = res.friends.slice(start, end);

      if (friendsToLoad.length === 0) {
        this.loading = false;
        return;
      }

      friendsToLoad.forEach((x) => {
        this.userService.currentUser(x).subscribe((friendRes) => {
       
         
          this.userFriends.push(friendRes);
        });
      });

      this.page++;
      this.loading = false;
    });
  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const threshold = scrollHeight - windowHeight - 100;

    if (scrollY >= threshold && !this.loading) {
      this.currentUser();
    }
  }

  switchCurrentUser(friendId: number) {
    this.activeId = friendId;
    this.userFriends = [];
    this.page = 1;
    this.currentUser();
  }

  deleteFriend(friendId: number) {
    if (this.loading) {
      return;
    }
  
    
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loading = true;
  
        this.userService.currentUser(this.activeId).subscribe((fullUser) => {
          const updatedFriends = fullUser.friends.filter((id) => id !== friendId);
  
          this.userService.updateFriendList(fullUser, updatedFriends).subscribe((updatedUser) => {
            this.currentUsr = updatedUser;
            this.userFriends = this.userFriends.filter((friend) => friend.id !== friendId);
            this.loading = false;
          });
        });
      }
    });
  }

}
