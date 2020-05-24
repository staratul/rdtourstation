import { Component, OnInit } from '@angular/core';
import { Enquery } from './../../models/enquery';
import { UiService } from './../../services/ui.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminControllerService } from './../../services/admin-controller.service';

@Component({
  selector: 'app-user-enquery',
  templateUrl: './user-enquery.component.html',
  styleUrls: ['./user-enquery.component.css']
})
export class UserEnqueryComponent implements OnInit {

  enquerys: any = [];
  isData:boolean = false;

  constructor(private ui:UiService,private as:AdminControllerService,private router: Router) { }

  ngOnInit() {
    this.ui.getEnqueryList().subscribe(data => {
      this.enquerys = data;
      if(this.enquerys.length > 0) {
        this.isData = true;
      }
    });
  }

  formTemplate = new FormGroup({
    enquery_key: new FormControl(''),
    user_name: new FormControl(''),
    user_phone: new FormControl(''),
    user_email: new FormControl(''),
    reply: new FormControl('', Validators.required),
  });

  get formControls() {
    return this.formTemplate['controls'];
  }

  sendMessage(key,name,email,phone,message) {
    this.formTemplate.setValue({
      enquery_key: key,
      user_name: name,
      user_phone: phone,
      user_email: email,
      reply: '',
    });
  }

  sendReply(formValue) {
    this.as.sendEnqueryMessageReply(formValue).subscribe(data => {
      console.log(data);
    });
    this.as.sentEnqueryMessage(formValue.enquery_key);
    location.reload();
  }

}
