import { TourService } from './../../../services/tour.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  tour_details:any = [];
  key: void;
  tourKey: string;
  offerExpries: number;
  itineraryArray:any = [];
  rating:any = [];

  constructor(private router: Router, private ar: ActivatedRoute,private tourService: TourService) { }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.tourKey = params['key'];
      this.tourDetails(params['key']);
    })
  }

  todayDate() {
    var today = new Date().toISOString().slice(0, 10);
    return today;
  }

  totalExpriesDay(today,date) {
    var date1 = new Date(today); 
    var date2 = new Date(date);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }
  
  arrayOfItinerary(day,desc) {
    for(let i = 0; i < day.length; i++) {
        this.itineraryArray.push({
          day: day[i],
          description: desc[i],
        });
    }
    // console.log(this.itineraryArray);
  }

  starRating(rating) {
    // console.log(rating);
    for(let i = 0; i < rating; i++) {
      this.rating.push(i);
    }
    // console.log(this.rating);
  }


  tourDetails(key) {
    this.tourService.getTourDetails(key).subscribe((data) => {
      console.log(data);
      this.tour_details = data;
      var today = this.todayDate(); 
      this.arrayOfItinerary(data.itinerary_day,data.itinerary_description);
      this.offerExpries = this.totalExpriesDay(today,data.expriesDate);
      this.starRating(data.rating);
    });
  }

}
