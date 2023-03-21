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
  loading = false
  page = 1
  sub$ = new Subject()

  getUsers(){
    this.loading = true;
   return this.userService.getUsers(this.page).subscribe(
    res => {
      this.users = this.users.concat(res)
      this.loading = false;
    }
   )
}

@HostListener('window:scroll', ['$event'])

onScroll(event: any) {

  const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  const max = document.documentElement.scrollHeight;
  if (pos == max) {

    if (!this.loading) {
      this.page++;
      this.getUsers();
    }
  }
}


ngOnInit(): void {

  this.getUsers()
}

ngOnDestroy(): void {
  this.sub$.next(null)
  this.sub$.complete()
}

}