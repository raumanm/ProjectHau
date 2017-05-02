import { Component, Output } from '@angular/core';

import { AppComponent } from 'app/app.component';

@Component({
moduleId: module.id,
    selector: 'my-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class PersonalInformationComponent  {
    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Omat tiedot";
    }
}
