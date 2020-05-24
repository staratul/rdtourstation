import { map } from 'rxjs/operators';
import { TourService } from './../../services/tour.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {

  ImageDetails: any[];
  rowIndexArray: any[];
  imageDetailsList: AngularFireList<any>;
  rating:any = [];
  one:any = [1];
  two:any = [1,2];
  three:any = [1,2,3];
  four:any = [1,2,3,4];
  five:any = [1,2,3,4,5];

  constructor(private tourservice: TourService,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getUser().subscribe(data => {
      // console.log(data);
      this.ImageDetails = data;
    });
  }

  getUser():Observable<any>{
    return this.db.list('/imageDetails').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    )
   }

}
