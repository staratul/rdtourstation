import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from 'angularfire2/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  imageDetailList: AngularFireList<any>;
  imageDetail: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase,private storage: AngularFireStorage) {
    this.imageDetail = firebase.list('imageDetails');
   }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);
  }

  updateImageDetails(id,imageDetails) {
    return this.firebase.object('/imageDetails/' + id).update(imageDetails);
  }

  getTourDetails(key):Observable<any> {
    return this.firebase.object('/imageDetails/' + key).valueChanges();
  }

  deleteTour(key: string) {
    this.imageDetail.remove(key);
  }

  deleteImage(url) {
    return this.storage.storage.refFromURL(url).delete();
  }

}
