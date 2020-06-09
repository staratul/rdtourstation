import { Component, OnInit } from '@angular/core';
import { UiService } from './../../services/ui.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {

  isData:boolean = false;
  feedbacks: any = [];

  constructor(private ui:UiService) { }

  ngOnInit(): void {
    this.ui.getFeedbackList().subscribe(data => {
      this.feedbacks = data;
      console.log(this.feedbacks);
      if(this.feedbacks.length > 0) {
        this.isData = true;
      }
    });
  }

}
