import { TourService } from './../../services/tour.service';
import { Router } from '@angular/router';
import { AdminControllerService } from './../../services/admin-controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css']
})
export class AllToursComponent implements OnInit {

  elementData:any = [];
  isData:boolean = false;
  dashboardId:string;

  constructor(private adminService: AdminControllerService, private router: Router,private ts: TourService) { }

  ngOnInit() {
    this.getAllTour();
  }

  getAllTour() {
    let resutl = [];
    this.adminService.alltours().subscribe(data => {
      this.elementData = data;
      if(this.elementData.length > 0) {
        this.isData = true;
      }
    });
  }

  editTour(key) {
    this.router.navigate(['dashboard/2euyfVXPqROCb3R0jOye8lUAYK83/edit-tour', key]);
  }

  deleteTour(key,url1,url2,url3,url4) {
    if(confirm("Are you sure to delete?")) {
      console.log(key,url1,url2,url3,url4);
      this.ts.deleteTour(key);
      let array = [];
      array.push({
        url1:url1,
        url2:url2,
        url3:url3,
        url4:url4
      })
      // console.log(array);
      for(let a of array) {
        this.DeleteTourImage(a);
      }
    } else {
      return false;
    }
  }

  DeleteTourImage(url) {
    for(let i = 1; i <= 4; i++) {
      // console.log(url[`url${i}`]);
      this.ts.deleteImage(url[`url${i}`]);
    }
  }

}
