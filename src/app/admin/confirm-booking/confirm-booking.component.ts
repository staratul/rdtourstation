import { BookingService } from './../../services/booking.service';
import { AuthService } from './../../services/auth.service';
import { TourService } from './../../services/tour.service';
import { Router } from '@angular/router';
import { AdminControllerService } from './../../services/admin-controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  confirmBooking:any = [];
  isData:boolean = false;
  dashboardId:string;

  constructor(
              private adminService: AdminControllerService, 
              private router: Router,
              private ts: TourService,
              private auth: AuthService,
              private booking: BookingService
              ) { }

  ngOnInit() {
    this.getBookingList();
  }

  getBookingList() {
    this.adminService.getConfirmBookingList().subscribe(data => {
      this.confirmBooking = data;
      console.log(this.confirmBooking);
      if(data.length > 0) {
        this.isData = true;
      }
    });
  }

  bookingConfirm(a) {
    this.adminService.confirmBookingEmail(a).subscribe(data => {
      console.log(data);
    });
    this.booking.deleteBooking(a.key);
    console.log("Mail Send Successfully");
  }

}
