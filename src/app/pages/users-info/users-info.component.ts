import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';

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

  ) {}

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

  deleteFriend(id: number) {
    const friendIndex = this.userFriends.findIndex(friend => friend.id === id);
  
    if (friendIndex !== -1) {
      // Remove the friend from userFriends array
      this.userFriends.splice(friendIndex, 1);
      
      console.log(this.userFriends)
  
     
      if (this.currentUsr) {
        this.currentUsr.friends = this.currentUsr.friends.filter(friendId => friendId !== id);
      }
  
      // Now, save the updated currentUsr object with the removed friend to your backend or service
      // You might need to call a service method to update the user's friend list on the server
      // Example: this.userService.updateUser(this.currentUsr).subscribe(result => {
      //   // Handle the response or update the UI as needed
      // });
    
    }
  }
  
  
  
  
  
  

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
   
    this.currentUser();
  }
}
