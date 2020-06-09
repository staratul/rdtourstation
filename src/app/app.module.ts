import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexAboutComponent } from './components/index-about/index-about.component';
import { LatestToursComponent } from './components/latest-tours/latest-tours.component';
import { SliderComponent } from './components/slider/slider.component';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "angularfire2/auth";
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddTourComponent } from './admin/add-tour/add-tour.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TourDetailsComponent } from './components/latest-tours/tour-details/tour-details.component';
import { ToursListComponent } from './components/tours-list/tours-list.component';

import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllToursComponent } from './admin/all-tours/all-tours.component';
import { EditTourComponent } from './admin/edit-tour/edit-tour.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserEnqueryComponent } from './admin/user-enquery/user-enquery.component';
import { UserMessagesComponent } from './admin/user-messages/user-messages.component';
import { BookingReviewComponent } from './components/booking-package/booking-review/booking-review.component';
import { BookingPackageComponent } from './components/booking-package/booking-package.component';

import { ConfirmBookingComponent } from './admin/confirm-booking/confirm-booking.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserFeedbackComponent } from './admin/user-feedback/user-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    IndexAboutComponent,
    LatestToursComponent,
    SliderComponent,
    SidebarComponent,
    DashboardComponent,
    AddTourComponent,
    TourDetailsComponent,
    ToursListComponent,
    AllUsersComponent,
    AllToursComponent,
    EditTourComponent,
    PaymentComponent,
    UserEnqueryComponent,
    UserMessagesComponent,
    BookingReviewComponent,
    BookingPackageComponent,
    ConfirmBookingComponent,
    FeedbackComponent,
    UserFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
