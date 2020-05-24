import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router,private as: AuthService) { }

  canActivate() {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    if(user.uid != "2euyfVXPqROCb3R0jOye8lUAYK83") {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
