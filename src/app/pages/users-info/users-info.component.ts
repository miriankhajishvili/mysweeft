import { Component, OnInit,HostListener } from '@angular/core';
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

 
  activeId!: number
  userFriends: IUsers[] = []
  currentUsr?: IUsers
  isLoading =false
  page = 1

  getAllFriends(){
    this.isLoading = true
   return this.userService.getAllFriends(this.page, this.activeId).subscribe(
      res => {
        this.isLoading = true
        this.userFriends = this.userFriends.concat(res)
        this.isLoading = false
        console.log(res)
      }
    
    )
  }

  @HostListener('window:scroll', ['$event'])

  onScroll(event: any) {

    const position = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const maxHeight = document.documentElement.scrollHeight;
    if (position == maxHeight) {

      if (!this.isLoading) {
        this.page++;
        this.getAllFriends();
      }
    }
  }

  currentUser(){
    return this.userService.currentUser(this.activeId).subscribe(
      res => {
       this.currentUsr = res
      }
    )
  }

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id']
    console.log(this.activeId)
    this.currentUser()
    this.getAllFriends()
  }

}
