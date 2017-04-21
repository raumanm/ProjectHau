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
import { SearchUsersComponent } from './user.component/search-users.component';
import { SearchPlacesComponent } from './place.component/search-places.component';
import { SearchVisitsComponent } from './visit.component/search-visits.component';

import { ShowDogComponent } from './dog.component/show-dog.component';
import { ShowUserComponent } from './user.component/show-user.component';
import { ShowPlaceComponent } from './place.component/show-place.component';
import { ShowVisitComponent } from "./visit.component/show-visit.component";

import { ModifyUserComponent } from './user.component/modify-user.component';
import { ModifyDogComponent } from './dog.component/modify-dog.component';
import { ModifyPlaceComponent } from './place.component/modify-place.component';
import { ModifyVisitComponent } from './visit.component/modify-visit.component';

import { AddDogToUserComponent } from './user.component/add-dog-to-user.component';


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
    { path: 'searchPlaces', component: SearchPlacesComponent},
    { path: 'searchVisits', component: SearchVisitsComponent},

    { path: 'showDog/:id', component: ShowDogComponent },
    { path: 'showUser/:id', component: ShowUserComponent },
    { path: 'showPlace/:id', component: ShowPlaceComponent},
    { path: 'showVisit/:id', component: ShowVisitComponent},

    { path : 'modifyUser/:id', component: ModifyUserComponent },
    { path : 'modifyDog/:id', component: ModifyDogComponent },
    { path : 'modifyPlace/:id', component: ModifyPlaceComponent },
    { path : 'modifyVisit/:id', component: ModifyVisitComponent },

    { path: 'addDogToUser/:id', component: AddDogToUserComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
