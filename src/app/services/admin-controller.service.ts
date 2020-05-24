import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminControllerService {

  itemsRef: AngularFireList<any>;
  sendMail = "sendmail";
  booking_confirm = "confirm-booking";

  constructor(public router: Router,private db: AngularFireDatabase,private http: HttpClient) {}

  allUser():Observable<any> {
    return this.db.object('/users').valueChanges();
  }

  alltours():Observable<any> {
    return this.db.list('/imageDetails').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    )
  }

  getTour(id):Observable<any> {
    return this.db.object('/imageDetails/' + id).valueChanges();
  }

  sendContactMessageReply(data) {
    // console.log(data);
    return this.http.post(this.sendMail, data);
  }

  updateContactMessage(key,data) {
    return this.db.object('/messages/' + key).update(data);
  }

  sentEnqueryMessage(key) {
    this.itemsRef = this.db.list('enquery');
    this.itemsRef.remove(key);
  }

  sendEnqueryMessageReply(data) {
    return this.http.post(this.sendMail, data);

  }
  confirmBookingEmail(data) {
    return this.http.post(this.booking_confirm, data);
  }

  getConfirmBookingList():Observable<any> {
    return this.db.list('/confirmBookings').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    )
  }

  getConfirmBookingDetails(key) {
    return this.db.object('/saveBookings/' + key).valueChanges();
  }

}
