import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './pages/users/users.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { MainLayoutModule } from './featurs/main-layout.module';
import { HttpClientModule } from '@angular/common/http';









@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersInfoComponent,
 
    
    
    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HttpClientModule
   

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
