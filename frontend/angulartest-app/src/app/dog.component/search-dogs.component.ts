/**
 * Created by M1k1tus on 28-Mar-17.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedDog: Dog;

  constructor(appComponent: AppComponent, private dogService: DogService, private router: Router) {

    appComponent.titleText = "Näytä koirat";
    this.dogService.getDogs().then(values=>this.addValues(values));

  }

  onSelect(dog: Dog): void {
    this.selectedDog = dog;
    this.router.navigate(['/showDog', this.selectedDog._id]);
  }

  private addValues(values: Dog[]) {
    this.dogs = values;
  }
}
