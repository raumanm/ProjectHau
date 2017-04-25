import { Component } from '@angular/core';
import { LoginService } from '../login.component/login.service';
import { AppComponent } from '../app.component';

@Component({
moduleId: module.id,
    selector: 'my-mainpage',
    templateUrl: './mainpage.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class MainPageComponent  {

    private userId: String;

    constructor(appComponent: AppComponent) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
        appComponent.titleText = "Etusivu";
    }
}
