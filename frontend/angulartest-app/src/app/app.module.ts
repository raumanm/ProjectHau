import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from './app-routes.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './mainpage.component/mainpage.component';
import { LoginPageComponent } from './login.component/login.component';
import { PersonalInformationComponent } from './personal-information.component/personal-information.component';
import { SearchComponent } from './search.component/search.component';
import { ReportsComponent } from './report.component/reports.component';
import { ReportComponent } from './report.component/report.component';
import { MessageComponent } from './message.component/message.component';

import { AddDogComponent } from './dog.component/add-dog.component';
import { AddUserComponent } from './user.component/add-user.component';
import { AddPlaceComponent } from './place.component/add-place.component';
import { AddVisitComponent } from './visit.component/add-visit.component';

import { SearchDogsComponent } from'./dog.component/search-dogs.component';
import { SearchUsersComponent } from './user.component/search-users.component';
import { SearchPlacesComponent } from './place.component/search-places.component';
import { SearchVisitsComponent } from './visit.component/search-visits.component';

import { LoginService } from './login.component/login.service';
import { AuthGuard } from './login.component/auth-quard.service';
import { SessionEndedComponent } from './session-ended.component/session-ended.component';

import { ReportService } from './report.component/report.service';
import { DogService } from './dog.component/dog.service';
import { UserService } from './user.component/user.service';
import { PlaceService } from './place.component/place.service';
import { VisitService } from './visit.component/visit.service';

import { ShowDogComponent } from './dog.component/show-dog.component';
import { ShowUserComponent } from './user.component/show-user.component';
import { ShowPlaceComponent } from "./place.component/show-place.component";
import { ShowVisitComponent } from './visit.component/show-visit.component';

import { ModifyUserComponent } from './user.component/modify-user.component';
import { ModifyDogComponent } from "./dog.component/modify-dog.component";
import { ModifyPlaceComponent } from './place.component/modify-place.component';
import { ModifyVisitComponent } from './visit.component/modify-visit.component';

import { AddDogToUserComponent } from './user.component/add-dog-to-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    SessionEndedComponent,
    PersonalInformationComponent,
    SearchComponent,
    ReportsComponent,
    ReportComponent,
    MessageComponent,

    AddDogComponent,
    AddUserComponent,
    AddPlaceComponent,
    AddVisitComponent,

    SearchDogsComponent,
    SearchUsersComponent,
    SearchPlacesComponent,
    SearchVisitsComponent,

    ShowDogComponent,
    ShowUserComponent,
    ShowPlaceComponent,
    ShowVisitComponent,

    ModifyUserComponent,
    ModifyDogComponent,
    ModifyPlaceComponent,
    ModifyVisitComponent,

    AddDogToUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    DogService,
    UserService,
    PlaceService,
    VisitService,
    LoginService,
    AuthGuard,
    ReportService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
