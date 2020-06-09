import { UiService } from './../../services/ui.service';
import { Contact } from './../../models/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  isSubmitted:boolean;

  constructor(private ui:UiService) { }

  formTemplate = new FormGroup({
    name: new FormControl('',),
    opinion: new FormControl('',),
    goal: new FormControl('',),
    feedback: new FormControl('',)
  });

  ngOnInit() {
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  onSubmit(formValue:any) {
    this.isSubmitted = true;
    // console.log(formValue);
    if(this.formTemplate.valid) {
      this.ui.feedback(formValue);
    }
    this.resetForm();
  }

  resetForm() {
    // this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      opinion: '',
      goal: '',
      feedback: ''
    });
    alert('Thank you for feedback.');
  }




}
