import { Router } from '@angular/router';
import { AdminControllerService } from './../../services/admin-controller.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../models/contact';
import { UiService } from './../../services/ui.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var jQuery:any;

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  isData:boolean = false;
  messages: Contact[];

  constructor(private ui:UiService,private as:AdminControllerService,private router: Router) { }

  formTemplate = new FormGroup({
    contact_key: new FormControl(''),
    user_name: new FormControl(''),
    user_phone: new FormControl(''),
    user_email: new FormControl(''),
    user_message: new FormControl(''),
    reply: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.ui.getMessagesList().subscribe(data => {
      this.messages = data;
      // console.log(this.messages);
      if(this.messages.length > 0) {
        this.isData = true;
      }
    });
  }

  sendReply(formValue) {
    var data = {
      key: formValue.contact_key,
      email: formValue.user_email,
      phone: formValue.user_phone,
      subject: formValue.user_message,
      reply: formValue.reply,
      isReply: true
    }

    this.as.sendContactMessageReply(formValue).subscribe(data => {
      console.log(data);
    });
    this.as.updateContactMessage(formValue.contact_key,data);
    location.reload();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  sendMessage(key,name,email,phone,message) {
    this.formTemplate.setValue({
      contact_key: key,
      user_name: name,
      user_phone: phone,
      user_email: email,
      user_message: message,
      reply: '',
    });
  }

}
