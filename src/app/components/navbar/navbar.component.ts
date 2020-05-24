import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggin:boolean = false;
  isNotLoggin:boolean = true;
  userEmail: string = '';

  constructor(private as: AuthService) { }

  ngOnInit() {
    this.isLogginUser();
    let user = localStorage.getItem('user');
    let json = JSON.parse(user);
    // console.log(json);
    if(json != null){
      this.userEmail = json.email;
    }
  }

  isLogginUser() {
    this.isLoggin = this.as.isLoggedIn;
    if(this.isLoggin) {
      this.isNotLoggin = false;
    }
  }

  logout() {
    let resutl = this.as.logout();
  }

}
