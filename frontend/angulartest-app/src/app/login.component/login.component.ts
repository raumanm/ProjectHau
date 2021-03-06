import { Component, Input } from '@angular/core';
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
        <h3 class="error">{{error}}</h3>
    `
})
export class LoginPageComponent {

    @Input() error: string

    constructor(private app: AppComponent, private loginService: LoginService, private router: Router) {
        app.titleText = "Sisäänkirjautuminen";
    }

    login(form: NgForm) {
        this.loginService.login(form.value).subscribe(
            (res) => {
                if(res) {
                    this.app.showLogout(true);
                    this.router.navigate(["/mainPage"]);
                } else {
                    this.error = "Väärä käyttäjätunnus tai salasana!"
                }
            }
        );
    }
}