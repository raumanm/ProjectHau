import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { MainPageComponent } from './mainpage.component/mainpage.component';
import { LoginPageComponent } from './login.component/login.component';
import { PersonalInformationComponent } from './personal-information.component/personal-information.component';
import { SearchComponent } from './search.component/search.component';
import { AddDogComponent } from './add-dog.component/add-dog.component';
import { AddPlaceComponent } from './add-place.component/add-place.component';
import { AddUserComponent } from './add-user.component/add-user.component';
import { VisitComponent } from './visit.component/visit.component';
import { ReportComponent } from './report.component/report.component';
import { MessageComponent } from './message.component/message.component';

export const routes: Routes = [
    { path: '', redirectTo: '/loginPage', pathMatch: 'full', },
    { path: 'mainPage',  component: MainPageComponent },
    { path: 'loginPage', component: LoginPageComponent },
    { path: 'personalInformation', component: PersonalInformationComponent },
    { path: 'search', component: SearchComponent },
    { path: 'addDog', component: AddDogComponent },
    { path: 'addPlace', component: AddPlaceComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'addVisit', component: VisitComponent },
    { path: 'report', component: ReportComponent },
    { path: 'message', component: MessageComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
