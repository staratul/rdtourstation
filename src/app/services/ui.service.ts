import { Contact } from './../models/contact';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  contactDetails: AngularFireList<any>;
  enqueryDetails: AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) {
    this.contactDetails = this.firebase.list('messages');
    this.enqueryDetails = this.firebase.list('enquery');
   }

  contactUs(data){
    return this.contactDetails.push(data);
  }

  enquery(data){
    return this.enqueryDetails.push(data);
  }

  getEnqueryList() {
    return this.enqueryDetails.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getMessagesList() {
    return this.contactDetails.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

}
