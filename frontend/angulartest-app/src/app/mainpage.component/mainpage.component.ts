import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
moduleId: module.id,
    selector: 'my-mainpage',
    templateUrl: './mainpage.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class MainPageComponent  {

    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Etusivu";
    }
}
