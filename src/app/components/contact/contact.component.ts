import { UiService } from './../../services/ui.service';
import { Contact } from './../../models/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isSubmitted:boolean;

  constructor(private ui:UiService) { }

  formTemplate = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl(null,Validators.required),
    subject: new FormControl('',Validators.required)
  });

  ngOnInit() {
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  onSubmit(formValue:Contact) {
    this.isSubmitted = true;
    // console.log(formValue);
    if(this.formTemplate.valid) {
      this.ui.contactUs(formValue);
    }
    this.resetForm();
  }

  resetForm() {
    // this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      email: '',
      phone: null,
      subject: '',
    });
    alert('Thank you for message us. We will reply you as soon as possible.');
  }


}
