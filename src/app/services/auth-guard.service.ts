import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private as: AuthService, private router: Router) { }

  canActivate() {
    let result = this.as.isLoggedIn;
    if(result) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
