import { Enquery } from './../../models/enquery';
import { Component, OnInit } from '@angular/core';
import { UiService } from './../../services/ui.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isSubmitted:boolean;

  constructor(private ui:UiService) { }

  ngOnInit() {
  }

  formTemplate = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl(null,Validators.required),
    from: new FormControl('',Validators.required),
    to: new FormControl('',Validators.required),
    adult: new FormControl(null,Validators.required),
    comment: new FormControl('',Validators.required)
  });

  get formControls() {
    return this.formTemplate['controls'];
  }

  onSubmit(formValue:Enquery) {
    this.isSubmitted = true;
    console.log(formValue);
    if(this.formTemplate.valid) {
      this.ui.enquery(formValue);
    }
    this.resetForm();
  }

  resetForm() {
    // this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      email: '',
      phone: null,
      from: '',
      to: '',
      adult: null,
      comment: '',
    });
    alert('Thank you for message us. We will reply you as soon as possible.');
  }

}
