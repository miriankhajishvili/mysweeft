import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService:UsersService
  ) { }

  users: any

  getAllUsers(){
   return this.userService.getAllUsers().subscribe(
    res => {
      this.users = res
    }
   )
  
}

ngOnInit(): void {

  this.getAllUsers()
}

}