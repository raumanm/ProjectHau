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
import { AddDogComponent } from './dog.component/add-dog.component';
import { AddUserComponent } from './user.component/add-user.component';
import { AddPlaceComponent } from './place.component/add-place.component';
import { VisitComponent } from './visit.component/add-visit.component';
import { ReportComponent } from './report.component/report.component';
import { MessageComponent } from './message.component/message.component';

import { DogFormService } from './dog.component/dog.service';
import { UserService } from './user.component/user.service';
import { PlaceService } from './place.component/place.service';
import { VisitService } from './visit.component/visit.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    PersonalInformationComponent,
    SearchComponent,
    AddDogComponent,
    AddUserComponent,
    AddPlaceComponent,
    VisitComponent,
    ReportComponent,
    MessageComponent
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
    DogFormService,
    UserService,
    PlaceService,
    VisitService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
