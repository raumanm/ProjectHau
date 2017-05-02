import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { AppComponent } from '../app.component';


@Component({
    selector: 'my-session-ended',
    template: `
        <h1>Istunto on päättynyt</h1>
        <a routerLink="/loginPage">Kirjaudu sisään</a>
    `,
    styleUrls: ['../stylesheets/style.css']
})
export class SessionEndedComponent {

    constructor(private app: AppComponent){
        if(localStorage.getItem("currentUser") != null) {
            localStorage.setItem("currentUser", null);
            localStorage.setItem("token", null);
            app.showLogout(false);
        }
    }
}