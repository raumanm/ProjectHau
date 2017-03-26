import { Component } from '@angular/core';

import { AppComponent } from 'app/app.component';

@Component({
moduleId: module.id,
    selector: 'my-report',
    templateUrl: './report.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class ReportComponent  {

    constructor(appComponent: AppComponent) {
        appComponent.titleText = "Raportit";
    }
}
