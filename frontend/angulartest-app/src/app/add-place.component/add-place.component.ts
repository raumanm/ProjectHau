import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PlaceService } from './add-place.service';
import { Place } from '../classes/place';
import { UtilsClass } from '../util/utilsclass';

import { AppComponent } from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'my-add-place',
    templateUrl: 'add-place.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddPlaceComponent {
  myForm: FormGroup;

  constructor(appComponent: AppComponent, fb: FormBuilder, private placeService: PlaceService) {

    appComponent.titleText = "Lisää kohde";

    this.myForm = fb.group({
      'name': ['Tuonelan vanhainkoti'],
      'addressStreet': ['Helvetinjärvenkatu 66'],
      'addressCode': ['33560'],
      'addressCity': ['Tampere'],
      'visitationInterval': [''],
      'pairAmount': ['2'],
      'overseerId': [''],
      'details': ['Ihan ihme paikka']
    });
  }

  onSubmit(value: string): void {
    let everythingOk = true;

    if(UtilsClass.validateShortOpenField(value["name"]) && UtilsClass.validateShortOpenField(value["addressStreet"]) &&
    UtilsClass.validateShortOpenField(value["addressCity"]) && UtilsClass.validateShortOpenField(value["overseerId"])) {
      console.log("open fields ok");
    } else {
      everythingOk = false;
    }

    if(UtilsClass.validateZipCode(value["addressCode"])) {
      console.log("zipOk");
    } else {
      everythingOk = false;
    }

    if(UtilsClass.validatePairAmount(value["pairAmount"])) {
      console.log("pairAmountok");
    } else {
      everythingOk = false;
    }
    if(value["details"] != "") {
      if(UtilsClass.validateLongOpenField(value["details"])) {
        console.log("detailsOk");
      } else {
        everythingOk = false;
      }
    }

    if(everythingOk) {
      //this.placeService.create(value);
      alert("Kohde lisätty onnistuneesti");
      console.log(value);
    } else {
      alert("Virhe! Tarkista syötteesi");
    }
  }
}
