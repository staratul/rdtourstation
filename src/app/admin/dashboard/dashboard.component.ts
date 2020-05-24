import { BookingService } from './../../services/booking.service';
import { UiService } from './../../services/ui.service';
import { AdminControllerService } from './../../services/admin-controller.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  admin:string;
  total_user: number;
  total_tour: number;
  total_enquery: number;
  total_message: number;
  total_confirm_booking: number;
  total_save_booking: number;
  constructor(private as: AdminControllerService,private ui:UiService, private booking:BookingService) { }

  ngOnInit() {
    this.totalUser();
    this.totalTour();
    this.totalEnquery();
    this.totalMessage();
    this.saveBooings();
    this.confirmBooking();
  }

  totalUser() {
    var count = 0;
    this.as.allUser().subscribe((data) => {
      for(let user in data) {
        ++count;
      }
      this.total_user = count;
    });
  }

  totalTour() {
    this.as.alltours().subscribe((data) => {
      this.total_tour = data.length;
      console.log(data.length);
    });
  }

  totalEnquery() {
    this.ui.getEnqueryList().subscribe((data) => {
      this.total_enquery = data.length;
    });
  }

  totalMessage() {
    this.ui.getMessagesList().subscribe((data) => {
      this.total_message = data.length;
    });
  }

  saveBooings() {
    var count = 0
    this.booking.countBookingList().subscribe(data => {
      for(let i in data) {
        ++count;
      }
      this.total_save_booking = count;
      // console.log(this.total_save_booking);
    });
  }

  confirmBooking() {
    var count = 0
    this.booking.countConfirmBookingList().subscribe(data => {
      if(data != null) {
        for(let i in data) {
          ++count;
        }
      } else {
        count = 0;
      }
      this.total_confirm_booking = count;
    });
  }

}
