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

  onSubmit(value: string): void {
    let everythingOk = true;

    if(!UtilsClass.validateShortOpenField(value["name"])) {
      alert("Virhe! Tarkista syötteesi kohdasta nimi");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["addressStreet"])) {
      alert("Virhe! Tarkista syötteesi kohdasta katuosoite");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["addressCity"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kaupunki");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["overseerId"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kohdevastaava");
      everythingOk = false;
    }

    if(!UtilsClass.validateZipCode(value["addressCode"])) {
      alert("Virhe! Tarkista syötteesi kohdasta postinumero. Postinumerossa on viisi numeroa väliltä 0-9");
      everythingOk = false;
    }

    if(!UtilsClass.validatePairAmount(value["pairAmount"])) {
      alert("Virhe! Tarkista syötteesi kohdasta optimikoirakkomäärä. Optimikoirakkomäärän tulee olla väliltä 1-9");
      everythingOk = false;
    }

    if(value["details"] != "") {
      if(!UtilsClass.validateLongOpenField(value["details"])) {
        alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
        everythingOk = false;
      }
    }

    if(everythingOk) {
      this.placeService.modify(value);
      alert("Kohde lisätty onnistuneesti");
      console.log(value);
    }
  }
}
