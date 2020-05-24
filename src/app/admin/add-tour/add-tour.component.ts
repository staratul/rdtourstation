import { TourService } from './../../services/tour.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireList } from 'angularfire2/database';
import * as $ from 'jquery'

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {

  ineraryCount = 0;
  ineraryCountDelete = 0;
  imgSrc1: string = '';  
  imgSrc2: string = '';  
  imgSrc3: string = '';  
  imgSrc4: string = '';  
  selectedImage:any;
  image_url_array = [];  
  selectedImageArray = [];  
  isSubmitted:boolean;
  // Ratings Names
  ratings: any = [1,2,3,4,5];

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    tourTitle: new FormControl(''),
    imageUrl1: new FormControl('', Validators.required),
    imageUrl2: new FormControl('', Validators.required),
    imageUrl3: new FormControl('', Validators.required),
    imageUrl4: new FormControl('', Validators.required),
    day: new FormControl(null, Validators.required),
    night: new FormControl(null, Validators.required),
    original_price: new FormControl(null, Validators.required),
    discount_price: new FormControl(null, Validators.required),
    rating: new FormControl(null, Validators.required),
    discount_offers: new FormControl('', Validators.required),
    expriesDate: new FormControl('', Validators.required),
    destinations: new FormControl('', Validators.required)
  });

  constructor(private storage: AngularFireStorage,private service: TourService) { }

  ngOnInit() {
    this.resetForm();
    this.service.getImageDetailList();
  }


  priceDiscount() {
    console.log('click');
    var op = $("#original_price").val();
    var dis = $("#discount_offers").val();
    var p = Number(dis) / 100;
    var y = p * Number(op);
    var totalPrice = Math.round(Number(op) - y);
    // console.log(op,dis,p,y,totalPrice);
    $("#discount_price").val(totalPrice);
  }


  showPreview(e:any) {
    if(e.target.files && e.target.files[0]){
      if(e.target.files.length <= 4 && e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
          const reader = new FileReader();
          if(i === 0) {
            reader.onload = (e:any) => this.imgSrc1 = e.target.result;
          } else if(i === 1) {
            reader.onload = (e:any) => this.imgSrc2 = e.target.result;
          } else if(i === 2) {
            reader.onload = (e:any) => this.imgSrc3 = e.target.result;
          } else if(i === 3) {
            reader.onload = (e:any) => this.imgSrc4 = e.target.result;
          }
          reader.readAsDataURL(e.target.files[i]);
          this.selectedImage = e.target.files[i];
          this.selectedImageArray.push(this.selectedImage);
        }
          // this.selectedImageArray.push(this.selectedImage);
          // console.log(this.selectedImageArray);
      } else {
        alert('You can only select 4 images');
        this.formTemplate.reset();
        return false;
      }
    } else {
      this.imgSrc1 = '../../../assets/img/no-preview.jpg';
      this.imgSrc2 = '../../../assets/img/no-preview.jpg';
      this.imgSrc3 = '../../../assets/img/no-preview.jpg';
      this.imgSrc4 = '../../../assets/img/no-preview.jpg';
      this.selectedImage = null;
    }
  }


  addItinerary() {
    console.log("click");
    ++this.ineraryCount;
    var html = `<div id='itineraryBox${this.ineraryCount}' style='border:1px solid gray' class='p-3 mt-3'>
                  <div class='form-group'>
                      <lable>Day ${this.ineraryCount}</lable>
                      <input class='form-control itineraryday' placeholder='Enter Title'>
                  </div>
                  <div class='form-group'>
                    <lable>Enter Description</lable>
                    <textarea class='form-control itinerartdescription' placeholder='Enter Description...'></textarea>
                  </div> 
                </div>`;

    $("#itineraryTextBox").append(html);
    this.ineraryCountDelete = this.ineraryCount;
  }

  deleteItinerary() {
    if(this.ineraryCountDelete < 0) {
      this.ineraryCount = 0;
    }
    $(`#itineraryBox${this.ineraryCountDelete}`).remove();
    --this.ineraryCountDelete;
  }

  async onSubmit(formValue) {
    this.isSubmitted = true;
    var itineraryDayArray = [];
    var itineraryDescriptionArray = [];
    $('.itineraryday').each(function(i, obj) {
        var itineraryDay
        itineraryDay = $(obj).val();
        itineraryDayArray.push(itineraryDay);
    });
    $('.itinerartdescription').each(function(i, obj) {
        var itineraryDescription
        itineraryDescription = $(obj).val();
        itineraryDescriptionArray.push(itineraryDescription);
    });
    formValue['itinerary_day'] = itineraryDayArray;
    formValue['itinerary_description'] = itineraryDescriptionArray;
    formValue['discount_price'] = $("#discount_price").val();
    if(this.selectedImageArray.length > 0) {  // 4 images in this array
      for (let index = 0; index < this.selectedImageArray.length; index++) {  // Loop through this image array
          await new Promise(resolve => {
              setTimeout(()=> {
                  console.log('This is iteration ' + index); 
                  var filePath = `images/tours/${this.selectedImageArray[index].name.split('.').slice(0,-1).join('.')}_${new Date().  getTime()}`;
                  const fileRef = this.storage.ref(filePath);
                  this.storage.upload(filePath, this.selectedImageArray[index]).snapshotChanges().pipe(
                    finalize(() => {
                      fileRef.getDownloadURL().subscribe((url) => {
                        formValue[`imageUrl${index+1}`] = url;
                        console.log(url);
                      });
                    })  
                  ).subscribe()
                  resolve();
              }, 3000);
          });
      }
      console.log('After loop execution');
      setTimeout(() => {
          this.value(formValue);
      }, 20000);
    }
  }

  value(value) {
    this.service.insertImageDetails(value);
    this.resetForm();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      imageUrl4: '',
      tourTitle: '',
      day: null,
      night: null,
      original_price: null,
      discount_price: null,
      rating: null,
      discount_offers:'',
      expriesDate:'',
      destinations:''
    });
    this.imgSrc1 = '../../../assets/img/no-preview.jpg';
    this.imgSrc2 = '../../../assets/img/no-preview.jpg';
    this.imgSrc3 = '../../../assets/img/no-preview.jpg';
    this.imgSrc4 = '../../../assets/img/no-preview.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
    $("#itineraryTextBox").html("");
  }


}
