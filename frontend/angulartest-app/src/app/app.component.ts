import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./stylesheets/style.css']
})

export class AppComponent {
    @Input()titleText;
    @Input()logout;

    constructor() {
        this.showLogout(localStorage.getItem('currentUser') != null);
    }

    public showLogout(isVisible: boolean): void {
        isVisible == true ? this.logout = "Kirjaudu ulos" : this.logout = null;
    }
}
