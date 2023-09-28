import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersInfoComponent } from './users-info.component';

const routes: Routes = [
  {
    path : '',
    component: UsersInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersInfoRoutingModule { }
