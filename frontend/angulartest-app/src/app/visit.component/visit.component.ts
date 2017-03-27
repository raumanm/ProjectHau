/**
 * Created by M1k1tus on 27-Mar-17.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { UtilsClass } from '../util/utilsclass';

import { AppComponent } from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'my-visit',
  templateUrl: 'visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class VisitComponent {
  myForm: FormGroup;

  constructor(appComponent: AppComponent, fb: FormBuilder, private visitService: VisitService) {

    appComponent.titleText = "Lisää vierailu";

    this.myForm = fb.group({
      'visitTime': [''],
      'placeId': [''],
      'assignedPairId': [''],
      'assignedPairStatus': [''],
      'details': ['Ihan ihme paikka']
    });
  }

  onSubmit(value: string): void {
    let everythingOk = true;

    if(value["visitTime"] != "") {
      if(UtilsClass.validateDate(value["visitTime"])) {
        let temp = UtilsClass.createDate(value["visitTime"]);
        value["visitTime"] = temp;
      } else {
        everythingOk = false;
      }
    } else {
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["placeId"]) || !UtilsClass.validateShortOpenField(value["assignedPairId"]) ||
    !UtilsClass.validateShortOpenField(value["assignedPairStatus"])) {
      everythingOk = false;
    }

    if(!UtilsClass.validateLongOpenField(value["details"])) {
      everythingOk = false;
    }

    if(everythingOk) {
      console.log(value);
      alert("Vierailu lisätty onnistuneesti");
    } else {
      alert("Virhe! Tarkista syötteesi");
    }
  }
}
