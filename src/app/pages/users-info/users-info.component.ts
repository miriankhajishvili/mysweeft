import { Component, OnInit } from '@angular/core';
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
  userFriends?: IUsers[]
  currentUsr?: IUsers

  getAllFriends(){
    return this.userService.getAllFriends().subscribe(
      res => {
        this.userFriends = res.filter(user => user.userId == this.activeId)
      }
    
    )
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
