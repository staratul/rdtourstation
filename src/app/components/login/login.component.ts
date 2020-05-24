import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private as: AuthService,private router: Router) { }

  ngOnInit() {
    this.checkLogin();
  }

  onSubmit(form: NgForm) {
    let  user = form.value;
    const result = this.as.login(user.email,user.password);
    // console.log(result);
  }

  checkLogin() {
    if (this.as.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
  }

}
