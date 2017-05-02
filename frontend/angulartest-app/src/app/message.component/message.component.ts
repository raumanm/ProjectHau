import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
moduleId: module.id,
    selector: 'my-message',
    templateUrl: './message.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class MessageComponent  {

    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Lähetä viesti";
    }
}
