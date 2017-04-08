/**
 * Created by M1k1tus on 28-Mar-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-show-dog',
  templateUrl: './show-dog.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowDogComponent implements OnInit {
  dog: Dog;

  constructor(appComponent: AppComponent, private dogService: DogService, private route: ActivatedRoute) {
    appComponent.titleText = "Näytä koira";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dogService.getDog(params['id']))
      .subscribe(dog => this.dog = dog);
  }


}
