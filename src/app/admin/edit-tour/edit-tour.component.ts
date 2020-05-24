import { AdminControllerService } from './../../services/admin-controller.service';
import { TourService } from './../../services/tour.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { AngularFireList } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css']
})
export class EditTourComponent implements OnInit {

  ineraryCount = 0;
  ineraryCountDelete = 0;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedImageArray = []; 

  imgSrc1: string = '';
  imgSrc2: string = '';
  imgSrc3: string = '';
  imgSrc4: string = '';
  imageUrlForUpdate1: string = '';  
  imageUrlForUpdate2: string = '';  
  imageUrlForUpdate3: string = '';  
  imageUrlForUpdate4: string = '';  
  selectedImage:any;
  isSubmitted:boolean;
  tourDetails:any = [];
  ratings: any = [1,2,3,4,5];

  formTemplate = new FormGroup({
    caption: new FormControl(''),
    tourTitle: new FormControl(''),
    imageUrl1: new FormControl(''),
    imageUrl2: new FormControl(''),
    imageUrl3: new FormControl(''),
    imageUrl4: new FormControl(''),
    day: new FormControl(null),
    night: new FormControl(null),
    original_price: new FormControl(null),
    discount_price: new FormControl(null),
    rating: new FormControl(null),
    discount_offers: new FormControl(''),
    expriesDate: new FormControl(''),
    destinations: new FormControl('')
  });

  constructor(
      private storage: AngularFireStorage,
      private service: TourService,
      private ar:ActivatedRoute,
      private as:AdminControllerService,
      private router: Router
      ) { }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.getImageDetails(params['id']);
    });
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

  addItinerary() {
    // console.log("click");
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

  getImageDetails(id) {
    this.as.getTour(id).subscribe(data => {
      this.tourDetails = data;
      this.imgSrc1 = data.imageUrl1;
      this.imgSrc2 = data.imageUrl2;
      this.imgSrc3 = data.imageUrl3;
      this.imgSrc4 = data.imageUrl4;
      this.imageUrlForUpdate1 = data.imageUrl1;
      this.imageUrlForUpdate2 = data.imageUrl2;
      this.imageUrlForUpdate3 = data.imageUrl3;
      this.imageUrlForUpdate4 = data.imageUrl4;
      this.formTemplate.patchValue({
            caption: data.caption,
            tourTitle: data.tourTitle,
            day: data.day,
            night: data.night,
            discount_price: data.discount_price,
            original_price: data.original_price,
            rating: data.rating,
            discount_offers: data.discount_offers,
            expriesDate: data.expriesDate,
            tags: data.tags,
            highlights: data.highlights,
            itinerary: data.itinerary,
            destinations: data.destinations,
            imageUrl1: '',
            imageUrl2: '',
            imageUrl3: '',
            imageUrl4: '',
          });
          var itinerary = data.itinerary_day;
          var description = data.itinerary_description
          var html = '';
          var ineraryCount = 0;
          itinerary.forEach(function(item,index){
            // console.log(item,description[index]);
            ++ineraryCount
            html += `<div id='itineraryBox${ineraryCount}' style='border:1px solid gray' class='p-3 mt-3'>
                          <div class='form-group'>
                              <lable>Day ${ineraryCount}</lable>
                              <input class='form-control itineraryday' value='${item}' placeholder='Enter Title'>
                          </div>
                          <div class='form-group'>
                            <lable>Enter Description</lable>
                            <textarea class='form-control itinerartdescription' placeholder='Enter Description...'>${description[index]}</textarea>
                          </div> 
                        </div>`;
          });
          this.ineraryCountDelete = ineraryCount;
          this.ineraryCount = ineraryCount;
          $("#itineraryTextBox").append(html);
          // console.log(itinerary,description);
    });
  }

  showPreview(e:any) {
    this.selectedImageArray = [];
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
          // console.log(this.selectedImageArray.length);
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

  async onSubmit(formValue) {
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
    let url = window.location.href;
    let array = url.split('/');
    this.isSubmitted = true;
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
    }
    if(this.selectedImageArray.length === 1) {
      formValue['imageUrl2'] = this.imageUrlForUpdate2;
      formValue['imageUrl3'] = this.imageUrlForUpdate3;
      formValue['imageUrl4'] = this.imageUrlForUpdate4;
    } else if(this.selectedImageArray.length === 2) {
      formValue['imageUrl3'] = this.imageUrlForUpdate3;
      formValue['imageUrl4'] = this.imageUrlForUpdate4;
    } else if(this.selectedImageArray.length === 3) {
      formValue['imageUrl4'] = this.imageUrlForUpdate4;
    } else if(this.selectedImageArray.length === 0) {
      formValue['imageUrl1'] = this.imageUrlForUpdate1;
      formValue['imageUrl2'] = this.imageUrlForUpdate2;
      formValue['imageUrl3'] = this.imageUrlForUpdate3;
      formValue['imageUrl4'] = this.imageUrlForUpdate4;
    }
    console.log('After loop execution');
    setTimeout(() => {
        this.service.updateImageDetails(array[6],formValue);
        this.router.navigate(['dashboard/2euyfVXPqROCb3R0jOye8lUAYK83/all-tours']);
    }, 20000);
  }


  get formControls() {
    return this.formTemplate['controls'];
  }

}
