/**
 * Created by M1k1tus on 27-Mar-17.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { UtilsClass } from '../util/utilsclass';

import { Place } from '../classes/place';
import { PlaceService } from '../place.component/place.service';

import { AppComponent } from '../app.component';
import {Pair} from "../classes/pair";

@Component({
  moduleId: module.id,
  selector: 'my-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class AddVisitComponent implements OnInit {
  myForm: FormGroup;
  places: Place[];
  pairs: Pair[];

  constructor(appComponent: AppComponent, fb: FormBuilder, private visitService: VisitService, private placeService: PlaceService) {

    appComponent.titleText = "Lisää vierailu";

    this.myForm = fb.group({
      'visitTime': [''],
      'placeId': [''],
      'assignedPairId': [''],
      'assignedPairStatus': [''],
      'details': ['']
    });
  }

  ngOnInit(): void {
    this.placeService.getPlaces().then(places=>this.places = places);
    this.visitService.getPairs().then(pairs=> this.addValues(pairs));
  }

  addValues(values: Pair[]): void {
    this.pairs = values;
  }

  onSubmit(value: string): void {
    let everythingOk = true;

    if(value["visitTime"] != "") {
      if(UtilsClass.validateDate(value["visitTime"])) {
        let temp = UtilsClass.createDate(value["visitTime"]);
        value["visitTime"] = temp;
      } else {
        alert("Virhe! Tarkista syötteesi kohdasta vierailuaika");
        everythingOk = false;
      }
    } else {
      alert("Virhe! Tarkista syötteesi kohdasta vierailuaika");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["placeId"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kohde");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["assignedPairId"])) {
      alert("Virhe! Tarkista syötteesi kohdasta koirakko");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["assignedPairStatus"])) {
      alert("Virhe! Tarkista syötteesi kohdasta koirakon tila");
      everythingOk = false;
    }

    if(!UtilsClass.validateLongOpenField(value["details"])) {
      alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
      everythingOk = false;
    }

    if(everythingOk) {
      this.visitService.create(value);
      alert("Vierailu lisätty onnistuneesti");
    }
  }
}
