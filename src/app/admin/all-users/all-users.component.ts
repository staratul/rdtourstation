import { element } from 'protractor';
import { AdminControllerService } from './../../services/admin-controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})

export class AllUsersComponent implements OnInit {

  elementData:any = [];
  isData:boolean = false;

  constructor(private adminService: AdminControllerService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    let resutl = [];
    this.adminService.allUser().subscribe(data => {
      for (var property in data) {
        this.elementData.push(data[property]);
      }
      if(this.elementData.length > 0) {
        this.isData = true;
      }
    });
  }

}
