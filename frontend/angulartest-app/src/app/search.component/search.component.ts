import { Component } from '@angular/core';

import { AppComponent } from 'app/app.component';

@Component({
moduleId: module.id,
    selector: 'my-search',
    templateUrl: './search.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class SearchComponent {

    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Haku";
    }
}


