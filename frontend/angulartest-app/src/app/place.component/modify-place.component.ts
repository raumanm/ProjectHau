/**
 * Created by M1k1tus on 21-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../user.component/user.service';
import { PlaceService } from './place.service';
import { Place } from '../classes/place';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';
import { User } from "../classes/user";

@Component({
  selector: 'my-modify-place',
  templateUrl: './modify-place.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyPlaceComponent implements OnInit {
  place: Place;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private placeService: PlaceService, private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder) {
    appComponent.titleText = "Muokkaa kohdetta";
  }

  ngOnInit(): void {
    // Fetch place
    this.route.params
      .switchMap((params: Params) => this.placeService.getPlace(params['id']))
      .subscribe(place => this.place = place);

    //Create form
    this.myForm = this.fb.group({
      'name': [''],
      'addressStreet': [''],
      'addressCode': [''],
      'addressCity': [''],
      'visitationInterval': [''],
      'pairAmount': [''],
      'details': ['']
    });

    // Update form values
    this.route.params
      .switchMap((params: Params) => this.placeService.getPlace(params['id']))
      .subscribe(place =>
        this.myForm.patchValue({
          name: place.name,
          addressStreet: place.addressStreet,
          addressCode: place.addressCode,
          addressCity: place.addressCity,
          visitationInterval: place.visitationInterval,
          pairAmount: place.pairAmount,
          details: place.details
        })
      );
  }
}
