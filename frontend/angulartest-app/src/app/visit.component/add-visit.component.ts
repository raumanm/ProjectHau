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
  templateUrl: './add-visit.component.html',
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
      'details': ['']
    });
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
      console.log(value);
      alert("Vierailu lisätty onnistuneesti");
    }
  }
}
