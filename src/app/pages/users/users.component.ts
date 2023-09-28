import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IUsers } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  users: IUsers[] = [];
  loading = false;
  page = 1;
  sub$ = new Subject();

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.page).subscribe(
      (res) => {
        if (res.length > 0) {
          this.users = this.users.concat(res);
          this.loading = false;
          console.log(res);
        }
      }
    );
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.userService.deleteUser(id).subscribe(() => {
          const index = this.users.findIndex((user) => user.id === id);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        });
      }
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
        this.getUsers();
      }
    }
  }
}
