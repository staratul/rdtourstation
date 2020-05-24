import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { auth } from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router,private db: AngularFireDatabase,private location: Location) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
   }

   async login(email: string, password: string) {
      var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.getUser(result.user.uid).subscribe(data => {
        // console.log(data);
        if(data.isAdmin) {
          this.router.navigate(['dashboard', result.user.uid]);
        } else {
          this.location.back();
        }
      });
   }

   async register(user) {
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    this.saveUser(result.user.uid, user);
    this.sendEmailVerification();
   }

   async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['login']);
   }

   async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
   }

   async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
   }

   get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
   }

   async  loginWithGoogle(){
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['admin/list']);
   }

   saveUser(uid,user) {
     this.db.object('/users/' + uid).update({
      id: uid,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      isAdmin: false
     });
   }

   getUser(uid):Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
   }

}
