import { BookingService } from './../../../services/booking.service';
import { TourService } from './../../../services/tour.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.css']
})
export class BookingReviewComponent implements OnInit {

  userData:any = [];
  tourKey: string;
  tour_date;
  bookingKey: string;
  tour_details:any = [];
  booking_detail:any = [];

  constructor(
              private auth: AuthService,
              private router: Router,
              private ar: ActivatedRoute,
              private tourService: TourService,
              private booking: BookingService
              ) { }

  ngOnInit() {
    let value = JSON.parse(localStorage.getItem('user'));
    this.auth.getUser(value.uid).subscribe(data => {
      this.userData = data;
      // console.log(this.userData);
    });
    this.ar.params.subscribe(params => {
      this.tourKey = params['key2'];
      this.bookingKey = params['key1'];
      this.bookingDetail(this.bookingKey);
      this.tourDetails(params['key2']);
    })
  }

  // Tour Details
  tourDetails(key) {
    this.tourService.getTourDetails(key).subscribe((data) => {
      // console.log(data);
      this.tour_details = data;
    });
  }

  bookingDetail(key) {
    this.booking.bookingDetails(key).subscribe(data => {
      this.booking_detail = data;
      var date:string = data.tour_date;
      var array = date.split('-');
      this.tour_date = new Date(Number(array[0]), Number(array[1]), Number(array[2])).toDateString();
    })
  }

}
