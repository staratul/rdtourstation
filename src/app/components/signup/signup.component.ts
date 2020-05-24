import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  mobile: number;

  constructor(private as: AuthService,private router: Router) { }

  ngOnInit() {
    this.checkLogin();
  }

  onSubmit(form: NgForm) {
    const result = this.as.register(form.value);
  }

  checkLogin() {
    if (this.as.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
  }

}
