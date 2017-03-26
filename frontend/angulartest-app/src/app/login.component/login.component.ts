import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
moduleId: module.id,
    selector: 'my-login-page',
    styleUrls: ['../stylesheets/style.css'],
    template: `
        <h1>Tervetuloa!</h1>
        <h2>Täytä käyttäjätiedot ja paina lähetä kirjautuaksesi sisään</h2>
        <form>
            Käyttäjätunnus: <br>
            <input type="text" name="userName" style="margin-top: 5px; margin-bottom: 25px"><br>
            Salasana: <br>
            <input type="password" name="password"><br><br>
        </form>
        <button [routerLink]="['/mainPage']"> Lähetä </button>
    `
})
export class LoginPageComponent  {

    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Sisäänkirjautuminen";
    }
}