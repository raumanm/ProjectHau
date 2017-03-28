/**
 * Created by M1k1tus on 28-Mar-17.
 */

import { Component } from '@angular/core';

import { DogFormService } from './dog.service';
import { Dog } from '../classes/dog';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'my-search-dogs',
  templateUrl: './search-dogs.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class SearchDogsComponent  {
  dogs: Dog[] = [];

  constructor(appComponent: AppComponent, private dogService: DogFormService) {

    appComponent.titleText = "Näytä koirat";
    this.dogs = this.dogService.dogs;

  }
}
