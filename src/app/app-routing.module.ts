import { UserFeedbackComponent } from './admin/user-feedback/user-feedback.component';
import { ConfirmBookingComponent } from './admin/confirm-booking/confirm-booking.component';
import { BookingPackageComponent } from './components/booking-package/booking-package.component';
import { BookingReviewComponent } from './components/booking-package/booking-review/booking-review.component';
import { UserMessagesComponent } from './admin/user-messages/user-messages.component';
import { UserEnqueryComponent } from './admin/user-enquery/user-enquery.component';
import { EditTourComponent } from './admin/edit-tour/edit-tour.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllToursComponent } from './admin/all-tours/all-tours.component';
import { AdminGuardService } from './services/admin-guard.service';
import { HomeGuardService } from './services/home-guard.service';
import { ToursListComponent } from './components/tours-list/tours-list.component';
import { TourDetailsComponent } from './components/latest-tours/tour-details/tour-details.component';
import { PaymentComponent } from './components/payment/payment.component';

import { AddTourComponent } from './admin/add-tour/add-tour.component';

import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'contact-us', component: ContactComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'tours', component: ToursListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'tour-details/:key', component: TourDetailsComponent},
  {path: 'booking-review/:key1/:key2', component: BookingReviewComponent, canActivate: [AuthGuardService]},
  {path: 'payment/:key1/:key2', component: PaymentComponent, canActivate: [AuthGuardService]},
  {path: 'booking-package/:key', component: BookingPackageComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard/:id', component: SidebarComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: DashboardComponent,canActivate: [AdminGuardService] },
    { path: 'add-tour', component: AddTourComponent,canActivate: [AdminGuardService]},
    { path: 'edit-tour/:id', component: EditTourComponent,canActivate: [AdminGuardService]},
    { path: 'all-tours', component: AllToursComponent, canActivate: [AdminGuardService]},
    { path: 'all-users', component: AllUsersComponent, canActivate: [AdminGuardService]},
    { path: 'user-enquery', component: UserEnqueryComponent, canActivate: [AdminGuardService]},
    { path: 'user-messages', component: UserMessagesComponent, canActivate: [AdminGuardService]},
    { path: 'user-feedbacks', component: UserFeedbackComponent, canActivate: [AdminGuardService]},
    { path: 'confirm-booking-list', component: ConfirmBookingComponent, canActivate: [AdminGuardService]}
  ]},
  {path: '**', component: HomeComponent, canActivate: [HomeGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
