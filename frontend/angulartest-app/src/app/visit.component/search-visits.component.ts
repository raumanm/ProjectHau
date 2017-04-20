/**
 * Created by M1k1tus on 02-Apr-17.
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

    appComponent.titleText = "Näytä kännit";
    this.visitService.getVisits().then(values=>this.addValues(values));

  }

  onSelect(visit: Visit): void {
    this.selectedVisit = visit;
    this.router.navigate(['/showVisit', (this.selectedVisit.visitTime + this.selectedVisit.placeId)]);
  }

  private addValues(values: Visit[]) {
    this.visits = values;

    for (let i=0; i<values.length; i++) {
      console.log("search-visits.component.ts: " + (this.visits[i].visitTime + this.selectedVisit.placeId));
    }
  }
}
