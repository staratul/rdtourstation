import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from 'angularfire2/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  saveBookingList: AngularFireList<any>;
  confirmBookingList: AngularFireList<any>;
  itemsRef: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase,private storage: AngularFireStorage) {
    this.saveBookingList = this.firebase.list('saveBookings');
    this.confirmBookingList = this.firebase.list('confirmBookings');
  }

  saveBooking(saveBookings){
    var result = this.saveBookingList.push(saveBookings);
    return result.key;
  }

  bookingDetails(key):Observable<any> {
    return this.firebase.object('/saveBookings/' + key).valueChanges();
  }

  confirmBooking(data) {
    return this.confirmBookingList.push(data);
  }

  deleteBooking(key) {
    this.itemsRef = this.firebase.list('confirmBookings');
    return this.itemsRef.remove(key);
  }

  countBookingList():Observable<any> {
    return this.firebase.object('/saveBookings').valueChanges();
  }


  countConfirmBookingList():Observable<any> {
    return this.firebase.object('/confirmBookings').valueChanges();
  }


}
