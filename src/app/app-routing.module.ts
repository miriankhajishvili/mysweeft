import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './featurs/main-layout.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path : "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: 'users',
        pathMatch: "full"
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users-info/:id',
        component: UsersInfoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
