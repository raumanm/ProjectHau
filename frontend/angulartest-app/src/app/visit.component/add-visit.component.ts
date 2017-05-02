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
import {AssignedPair} from '../classes/assignedPair'

@Component({
  moduleId: module.id,
  selector: 'my-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class AddVisitComponent implements OnInit {
  myForm: FormGroup;
  assignPairs: FormGroup;
  assignedPairs: AssignedPair[] = [];
  places: Place[];
  pairs: Pair[];

  constructor(appComponent: AppComponent, fb: FormBuilder, private visitService: VisitService, private placeService: PlaceService) {

    appComponent.titleText = "Lisää vierailu";

    this.myForm = fb.group({
      'visitTime': [''],
      'placeId': [''],
      'details': ['']
    });

    this.assignPairs = fb.group({
      'pair': [''],
      'status': ['']
    });
  }

  ngOnInit(): void {
    this.placeService.getPlaces().then(places=>this.places = places);
    this.visitService.getPairs().then(pairs=> this.addValues(pairs));
  }

  addValues(values: Pair[]): void {
    this.pairs = values;
  }

  addPair(event, value: string) {
    event.preventDefault();
    for (let apair of this.assignedPairs) {
      if (apair.pair._id == value['pair']) {
        apair.status = value['status'];
        return;
      }
    }

    for (let pair of this.pairs) {
      if (value['pair'] == pair._id) {
          this.assignedPairs.push(new AssignedPair(value['status'], pair));
          return;
      }
    }
  }

  onSubmit(event, value: string): void {
    event.preventDefault();
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

    /*
    if(!UtilsClass.validateShortOpenField(value["placeName"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kohteen nimi");
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
    */

    if(value["details"] != "") {
      if(UtilsClass.validateLongOpenField(value["details"])) {
      } else {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
      }
    }

    value['assignedPairs'] = this.assignedPairs;

    if(everythingOk) {
      this.visitService.create(value);
      alert("Vierailu lisätty onnistuneesti");
    }
  }
}
