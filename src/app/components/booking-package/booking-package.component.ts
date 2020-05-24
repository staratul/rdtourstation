import { BookingService } from './../../services/booking.service';
import { TourService } from './../../services/tour.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery'


@Component({
  selector: 'app-booking-package',
  templateUrl: './booking-package.component.html',
  styleUrls: ['./booking-package.component.css']
})
export class BookingPackageComponent implements OnInit {

  userData:any = [];
  tourKey: string;
  userKey: string;
  tour_details:any = [];

  constructor(
              private auth: AuthService,
              private router: Router, 
              private ar: ActivatedRoute,
              private tourService: TourService,
              private booking: BookingService
              ) { }

  ngOnInit() {
    let value = JSON.parse(localStorage.getItem('user'));
    this.userKey = value.uid;
    this.auth.getUser(value.uid).subscribe(data => {
      this.userData = data;
      // console.log(this.userData);
    });
    this.ar.params.subscribe(params => {
      this.tourKey = params['key'];
      this.tourDetails(params['key']);
    })
  }

  priceCalculation() {
    var adult = Number($("#qty").val());
    var child = Number($("#qty1").val());
    var price = Number($("#original_price").text());
    var child_price = (price / 2) * child;
    var totalPrice = (adult * price) + (child_price);
    $("#total_tour_price").text(totalPrice);
    $("#adult_price_change").text(adult);
    $("#child_price_change").text(child);
  }

  // Subtract Adult
  adultSub() {
    this.priceCalculation();
  }

  // Add Adult
  adultAdd() {
    this.priceCalculation();
  }

  // Subtract Child
  childSub() {
    this.priceCalculation();
  }

  // Add Child
  childAdd() {
    this.priceCalculation();
  }

  // Tour Details
  tourDetails(key) {
    this.tourService.getTourDetails(key).subscribe((data) => {
      // console.log(data);
      this.tour_details = data;
    });
  }

  onProceedSubmit() {
    var adult = Number($("#qty").val());
    var child = Number($("#qty1").val());
    var date = $("#tour_date").val();
    var total_price = Number($("#total_tour_price").text());
    var fullName = $("#fullName").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var today = new Date().toDateString();
    let data = {
      adult: adult,
      child: child,
      tour_date: date,
      booking_date: today,
      total_price: total_price,
      tour_details: {
        day: this.tour_details.day,
        night: this.tour_details.night,
        price: this.tour_details.discount_price,
        title: this.tour_details.tourTitle
      },
      user_detals: {
        fullName: fullName,
        email: email,
        mobile: mobile
      }
    };
    // console.log(data);
    var booking_key = this.booking.saveBooking(data);
    this.router.navigate(['/booking-review/'+booking_key+'/'+this.tourKey]);
  }


}
