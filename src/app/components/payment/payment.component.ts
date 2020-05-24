import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingService } from './../../services/booking.service';
import { TourService } from './../../services/tour.service';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  tourKey: string;
  userKey: string;
  bookingKey: string;
  booking_details:any = [];

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
    this.ar.params.subscribe(params => {
      this.tourKey = params['key2'];
      this.bookingKey = params['key1'];
    })
    this.booking.bookingDetails(this.bookingKey).subscribe(data => {
      this.booking_details = data;
    });
  }

  formTemplate = new FormGroup({
    cardname: new FormControl('', Validators.required),
    cardnumber: new FormControl(''),
    expmonth: new FormControl('', Validators.required),
    expyear: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required)
  });

  get formControls() {
    return this.formTemplate['controls'];
  }

  onSubmit(form) {
    var today = new Date().toDateString();
    form["booking_date"] = today;
    form["booking_details"] = this.booking_details;
    console.log(form);
    this.booking.confirmBooking(form);
    alert('You have done successfully.');
    window.location.href = "/";
  }

}
