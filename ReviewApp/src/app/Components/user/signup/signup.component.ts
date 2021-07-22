import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMsg: boolean;
  serverErrorMsg: string;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMsg = true;
        setTimeout(() => this.showSuccessMsg = false, 4000);
        this.resetForm(form);
      },
      err => {
        if(err.status == 422){
          this.serverErrorMsg = err.error.join('<br/>')
        }
        else
          this.serverErrorMsg = "Something went wrong. Please contact administrator.";
      }
    )
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      name: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMsg = '';
  }
}
