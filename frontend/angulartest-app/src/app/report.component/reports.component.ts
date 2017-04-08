import { Component } from '@angular/core';
import { ReportComponent } from './report.component';

import { AppComponent } from 'app/app.component';

@Component({
  moduleId: module.id,
  selector: 'my-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['../stylesheets/style.css']
})
export class ReportsComponent {
  reportComponent: ReportComponent;

  constructor(appComponent: AppComponent) {
    appComponent.titleText = "Raportit";
  }
}
