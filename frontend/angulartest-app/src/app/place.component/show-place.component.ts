/**
 * Created by M1k1tus on 08-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { PlaceService } from './place.service';
import { Place } from '../classes/place';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-show-place',
  templateUrl: './show-place.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowPlaceComponent implements OnInit {
  place: Place;

  constructor(appComponent: AppComponent, private placeService: PlaceService, private route: ActivatedRoute) {
    appComponent.titleText = "Näytä kohde";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.placeService.getPlace(params['id']))
      .subscribe(user => this.user = user);
  }


}
