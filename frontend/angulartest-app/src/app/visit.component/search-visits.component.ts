/**
 * Created by M1k1tus on 08-Apr-17.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-search-visits',
  templateUrl: './search-visits.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class SearchVisitsComponent  {
  visits: Visit[] = [];
  selectedVisit: Visit;

  constructor(appComponent: AppComponent, private visitService: VisitService, private router: Router) {

    appComponent.titleText = "Näytä käynnit";
    this.visitService.getVisits().then(values=>this.addValues(values));

  }

  onSelect(visit: Visit): void {
    this.selectedVisit = visit;
    this.router.navigate(['/showVisit', this.selectedVisit._id]);
  }

  private addValues(values: Visit[]) {
    this.visits = values;
  }
}
