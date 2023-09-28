import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './featurs/main-layout.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
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
        loadChildren: () => import('./pages/users/users.module').then(m=> m.UsersModule)
      },

      {
        path: 'users-info/:id',
        loadChildren: () => import('./pages/users-info/users-info.module').then(m=> m.UsersInfoModule)
      },
      {

        path: 'add-user',
      loadChildren: () => import('./pages/add-user/add-user.module').then(m =>m.AddUserModule )
         
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
