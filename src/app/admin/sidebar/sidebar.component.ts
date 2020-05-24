import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  adminId: string = '';
  isActive:boolean = false;
  admin: string = "";

  constructor(private as: AuthService,private ar: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.isLoggin();
    let url = window.location.href;

    let array = url.split('/');
    let id = '2euyfVXPqROCb3R0jOye8lUAYK83';
    if(array[4] != id) {
      this.router.navigate(['/']);
      return false;
    }
    this.getUser('2euyfVXPqROCb3R0jOye8lUAYK83');
  }

  signout() {
    let resutl = this.as.logout();
  }

  isLoggin() {
    let result = this.as.isLoggedIn;
  }

  getUser(uid) {
    this.as.getUser(uid).subscribe((data) => {
      this.adminId = data.id;
    });
  }

}
