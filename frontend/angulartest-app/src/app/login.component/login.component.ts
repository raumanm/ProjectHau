import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppComponent } from '../app.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
moduleId: module.id,
    selector: 'my-login-page',
    styleUrls: ['../stylesheets/style.css'],
    template: `
        <h1>Tervetuloa!</h1>
        <h2>Täytä käyttäjätiedot ja paina lähetä kirjautuaksesi sisään</h2>
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
            Käyttäjätunnus: <br>
            <input type="text" name="username" style="margin-top: 5px; margin-bottom: 25px" ngModel><br>
            Salasana: <br>
            <input type="password" name="password" ngModel><br><br>
            <input type="submit" value="Lähetä">
        </form>
    `
})
export class LoginPageComponent implements OnInit {

    constructor(appComponent: AppComponent, private loginService: LoginService, private router: Router) {
        appComponent.titleText = "Sisäänkirjautuminen";
    }

    login(form: NgForm) {
        this.loginService.login(form.value).subscribe(
            (res) => {
                if(res) {
                    console.log("Succeeded", localStorage);
                } else {
                    console.log("Failed");
                }
            }
        );
    }

    ngOnInit() {
        
    }
}