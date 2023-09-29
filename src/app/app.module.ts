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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';
import { MatSelectModule} from '@angular/material/select';












@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersInfoComponent,
    AddUserComponent,
    DeleteConfirmationComponent,
 
    
    
    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule
   

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
