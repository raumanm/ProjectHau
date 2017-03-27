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
      'assignedPairStatus': ['Tampere'],
      'details': ['Ihan ihme paikka']
    });
  }

  onSubmit(value: string): void {
    let everythingOk = true;
    console.log(value);
  }
}
