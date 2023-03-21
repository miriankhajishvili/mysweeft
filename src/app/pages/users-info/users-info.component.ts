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
  loading =false
  page = 1

  getFriends(){
    this.loading = true
   return this.userService.getFriends(this.page, this.activeId).subscribe(
      res => {
        this.loading = true
        this.userFriends = this.userFriends.concat(res)
        this.loading = false
        console.log(res)
      }
    
    )
  }

  @HostListener('window:scroll',['$event'])

  onScroll(event: any) {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos == max) {

      if (!this.loading) {
        this.page++;
        this.getFriends();
      }
    }
  }

  currentUser(){
    return this.userService.currentUser(this.activeId).subscribe(
      result => {
       this.currentUsr = result
      }
    )
  }

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id']
    this.currentUser()
    this.getFriends()
  }

}
