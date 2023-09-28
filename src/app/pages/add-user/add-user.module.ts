import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';

import { AddUserRoutingModule } from './add-user-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    MatFormFieldModule,
  ]
})
export class AddUserModule { }
