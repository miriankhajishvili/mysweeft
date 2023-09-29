import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    profilePic: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }



  ngOnInit(): void {
  }

  submit() {

    const  newUser = {...this.form.value, friends: []}

    this.userService.addNewUser(newUser).subscribe(res => {
      console.log(res);
    });

    this.router.navigate(['/users']);
  }
}
