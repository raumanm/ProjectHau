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
import { AuthGuard } from './login.component/auth-quard.service';
import { SessionEndedComponent } from './session-ended.component/session-ended.component';

export const routes: Routes = [
    { path: '', redirectTo: '/loginPage', pathMatch: 'full', },
    { path: 'mainPage',  component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'loginPage', component: LoginPageComponent },
    { path: 'sessionEnded', component: SessionEndedComponent },
    { path: 'personalInformation', component: PersonalInformationComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'report/:title', component: ReportComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'message', component: MessageComponent, canActivate: [AuthGuard] },

    { path: 'addDog', component: AddDogComponent, canActivate: [AuthGuard] },
    { path: 'addPlace', component: AddPlaceComponent, canActivate: [AuthGuard] },
    { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'addVisit', component: AddVisitComponent, canActivate: [AuthGuard] },

    { path: 'searchDogs', component: SearchDogsComponent, canActivate: [AuthGuard] },
    { path: 'searchUsers', component: SearchUsersComponent, canActivate: [AuthGuard] },
    { path: 'searchPlaces', component: SearchPlacesComponent, canActivate: [AuthGuard]},
    { path: 'searchVisits', component: SearchVisitsComponent, canActivate: [AuthGuard]},

    { path: 'showDog/:id', component: ShowDogComponent, canActivate: [AuthGuard] },
    { path: 'showUser/:id', component: ShowUserComponent, canActivate: [AuthGuard] },
    { path: 'showPlace/:id', component: ShowPlaceComponent, canActivate: [AuthGuard]},
    { path: 'showVisit/:id', component: ShowVisitComponent, canActivate: [AuthGuard]},

    { path : 'modifyUser/:id', component: ModifyUserComponent, canActivate: [AuthGuard] },
    { path : 'modifyDog/:id', component: ModifyDogComponent, canActivate: [AuthGuard] },
    { path : 'modifyPlace/:id', component: ModifyPlaceComponent, canActivate: [AuthGuard] },
    { path : 'modifyVisit/:id', component: ModifyVisitComponent, canActivate: [AuthGuard] },

    { path: 'addDogToUser/:id', component: AddDogToUserComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
