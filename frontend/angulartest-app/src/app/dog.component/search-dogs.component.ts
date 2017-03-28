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
    this.fillArrayWithMockupData();

  }

  fillArrayWithMockupData() {
    this.dogs.push(new Dog("111ID", "Bowmores Irish Cream", "Sylvi", new Date(2003,0,28), "Labradorinnoutaja", "444RN", "Active"));
    this.dogs.push(new Dog("222ID", "Jepen musta salama", "Jaska", new Date(2005,4,12), "Sekarotuinen", "231RN", "Passive"));
    this.dogs.push(new Dog("333ID", "Jaskan ruskea salama", "Jeppe", new Date(2006,6,17), "Sekarotuinen", "4475RN", "Active"));
    this.dogs.push(new Dog("444ID", "Raisan hurtta", "Musti", new Date(2003,7,22), "Kultainennoutaja", "4334RN", "Active"));
    console.log(this.dogs);
  }
}
