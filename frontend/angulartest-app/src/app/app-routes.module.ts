import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { MainPageComponent } from './mainpage.component/mainpage.component';
import { LoginPageComponent } from './login.component/login.component';
import { PersonalInformationComponent } from './personal-information.component/personal-information.component';
import { SearchComponent } from './search.component/search.component';
import { ReportsComponent } from './report.component/reports.component';
import { ReportComponent } from './report.component/report.component';
import { MessageComponent } from './message.component/message.component';

import { AddDogComponent } from './dog.component/add-dog.component';
import { AddPlaceComponent } from './place.component/add-place.component';
import { AddUserComponent } from './user.component/add-user.component';
import { AddVisitComponent } from './visit.component/add-visit.component';

import { SearchDogsComponent } from './dog.component/search-dogs.component';

import { ShowDogComponent } from './dog.component/show-dog.component';
import {SearchUsersComponent} from "./user.component/search-users.component";

export const routes: Routes = [
    { path: '', redirectTo: '/loginPage', pathMatch: 'full', },
    { path: 'mainPage',  component: MainPageComponent },
    { path: 'loginPage', component: LoginPageComponent },
    { path: 'personalInformation', component: PersonalInformationComponent },
    { path: 'search', component: SearchComponent },
    { path: 'report/:title', component: ReportComponent },
    { path: 'reports', component: ReportsComponent},
    { path: 'message', component: MessageComponent },

    { path: 'addDog', component: AddDogComponent },
    { path: 'addPlace', component: AddPlaceComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'addVisit', component: AddVisitComponent },

    { path: 'searchDogs', component: SearchDogsComponent },
    { path: 'searchUsers', component: SearchUsersComponent },

    { path: 'showDog/:id', component: ShowDogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
