/**
 * Created by M1k1tus on 08-Apr-17.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlaceService } from './place.service';
import { Place } from '../classes/place';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class SearchPlacesComponent  {
  places: Place[] = [];
  selectedPlace: Place;

  constructor(appComponent: AppComponent, private placeService: PlaceService, private router: Router) {

    appComponent.titleText = "Näytä kohteet";
    this.placeService.getPlaces().then(values=>this.addValues(values));

  }

  onSelect(place: Place): void {
    this.selectedPlace = place;
    this.router.navigate(['/showPlace', this.selectedPlace._id]);
  }

  private addValues(values: Place[]) {
    this.places = values;
  }
}
