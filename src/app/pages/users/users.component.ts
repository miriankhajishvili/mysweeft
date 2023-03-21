import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy{

  constructor(
    private userService:UsersService
  ) { }

  users: IUsers[] = []
  isLoading = false
  page = 1
  sub$ = new Subject()

  getAllUsers(){
    this.isLoading = true;
   return this.userService.getAllUsers(this.page).subscribe(
    res => {
      this.users = this.users.concat(res)
      this.isLoading = false;
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
      this.getAllUsers();
    }
  }
}


ngOnInit(): void {

  this.getAllUsers()
}

ngOnDestroy(): void {
  this.sub$.next(null)
  this.sub$.complete()
}

}