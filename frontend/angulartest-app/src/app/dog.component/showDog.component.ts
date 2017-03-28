/**
 * Created by M1k1tus on 28-Mar-17.
 */

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
  selector: 'my-show-dog',
  templateUrl: './show-dog.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowDogComponent  {
  dog: Dog;

  constructor(appComponent: AppComponent, private dogService: DogFormService) {

    appComponent.titleText = "Näytä koira";

  }

  /*ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dogService.getDog(+params['_id']))
      .subscribe(dog => this.dog = dog);
  }*/

}
