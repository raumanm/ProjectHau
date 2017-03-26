import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PlaceService } from './add-place.service';
import { Place } from '../classes/place';
import { UtilsClass } from '../util/utilsclass';

@Component({
    moduleId: module.id,
    selector: 'my-add-place',
    templateUrl: 'add-place.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddPlaceComponent {
  myForm: FormGroup;

  constructor(fb: FormBuilder, private placeService: PlaceService) {
    this.myForm = fb.group({
      'name': [''],
      'addressStreet': [''],
      'addressCode': [''],
      'addressCity': [''],
      'visitationInterval': [''],
      'pairAmount': [''],
      'overseerId': [''],
      'details': ['']
    });
  }

  onSubmit(value: string): void {
    console.log(value);
  }
}
