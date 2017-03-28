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
  moduleId: module.id,
  selector: 'my-show-dog',
  templateUrl: './show-dog.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowDogComponent implements OnInit {
  /*ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let dogId = params['id'];
      //console.log(dogId);
      //this.dog = this.dogService.getDog(params['id']);
      //this.dog => this.dogService.getDog(params['id']);
      //this.dogService.getDog(params['id']).subscribe(dog => this.dog = dog);
    });
  }*/
  dog: Dog;
  dogId: string;

  constructor(appComponent: AppComponent, private dogService: DogService, private route: ActivatedRoute) {
    //this.dog = this.dogService.getDog(params("id"));
    appComponent.titleText = "Näytä koira";
    console.log(this.dogId);

  }

  ngOnInit() {
    // Capture the access token and code
    this.route
      .queryParams
      .subscribe(params => {
        this.dogId = params['id'];
      });

    // do something with this.code and this.accesstoken
  }


}
