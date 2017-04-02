/**
 * Created by M1k1tus on 28-Mar-17.
 */

import { Component } from '@angular/core';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  //moduleId: module.id,
  selector: 'my-search-dogs',
  templateUrl: './search-dogs.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class SearchDogsComponent  {
  dogs: Dog[] = [];

  constructor(appComponent: AppComponent, private dogService: DogService) {

    appComponent.titleText = "Näytä koirat";
    this.dogService.getDogs().then(values=>this.addValues(values));

  }

  private addValues(values: Dog[]) {
    this.dogs = values;

    for (var i=0; i<values.length; i++) {
      console.log("search-dogs.component.ts: " + this.dogs[i].dogId);
    }
  }
}
