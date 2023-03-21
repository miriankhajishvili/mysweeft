import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { MainLayoutModule } from './featurs/main-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';









@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersInfoComponent,
    AddUserComponent,
 
    
    
    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule
   

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
