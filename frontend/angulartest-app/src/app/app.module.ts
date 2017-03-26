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
import { AddDogComponent } from './add-dog.component/add-dog.component';
import { AddUserComponent } from './add-user.component/add-user.component';
import { ReportComponent } from './report.component/report.component';
import { MessageComponent } from './message.component/message.component';

import { DogFormService } from './dog-form.component/dog-form.service'
import { UserService } from './add-user.component/add-user.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    PersonalInformationComponent,
    SearchComponent,
    AddDogComponent,
    AddUserComponent,
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
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
