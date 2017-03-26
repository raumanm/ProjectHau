import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DogFormService } from '../dog-form.component/dog-form.service';
import { Dog } from '../classes/dog';
import { UtilsClass } from '../util/utilsclass';

@Component({
    moduleId: module.id,
    selector: 'my-add-dog',
    templateUrl: 'add-dog-form.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddDogComponent  {
     myForm: FormGroup;

    constructor(fb: FormBuilder, private dogService: DogFormService) {
        this.myForm = fb.group({
        'nameFull': ['Jepen musta salama'],
        'nameNickname': ['Jaska'],
        'dateBirth': ['2006-07-05'],
        'breed': ['Sekarotuinen'],
        'registerNumber': ['6533TY'],
        'status': [''],
        'dateQualification': [''],
        'dateGraduation': [''],
        'dateMedal': [''],
        'dateRetired': [''],
        'details': ['Sellanen']
        });
    }

    onSubmit(value: string): void {
      let everythingOk = true;

      if(UtilsClass.validateShortOpenField(value["nameFull"]) && UtilsClass.validateShortOpenField(value["nameNickname"]) &&
      UtilsClass.validateShortOpenField(value["breed"]) && UtilsClass.validateShortOpenField(value["registerNumber"]) &&
      UtilsClass.validateShortOpenField(value["status"])) {
      } else {
        everythingOk = false;
      }

      if(value["details"] != "") {
        if(UtilsClass.validateLongOpenField(value["details"])) {
        } else {
          everythingOk = false;
        }
      }

      if(UtilsClass.validateDate(value["dateBirth"])) {
        let temp = UtilsClass.createDate(value["dateBirth"]);
        value["dateBirth"] = temp;
      } else {
        everythingOk = false;
      }

      if(value["dateQualification"] != "") {
        if(UtilsClass.validateDate(value["dateQualification"])) {
          let temp = UtilsClass.createDate(value["dateQualification"]);
          value["dateQualification"] = temp;
        } else {
          everythingOk = false;
        }
      }

      if(value["dateGraduation"] != "") {
        if(UtilsClass.validateDate(value["dateGraduation"])) {
          let temp = UtilsClass.createDate(value["dateGraduation"]);
          value["dateGraduation"] = temp;
        } else {
          everythingOk = false;
        }
      }

      if(value["dateMedal"] != "") {
        if(UtilsClass.validateDate(value["dateMedal"])) {
          let temp = UtilsClass.createDate(value["dateMedal"]);
          value["dateMedal"] = temp;
        } else {
          everythingOk = false;
        }
      }

      if(value["dateRetired"] != "") {
        if(UtilsClass.validateDate(value["dateRetired"])) {
          let temp = UtilsClass.createDate(value["dateRetired"]);
          value["dateRetired"] = temp;
        } else {
          everythingOk = false;
        }
      }

      if(everythingOk) {
        console.log(value);
        this.dogService.create(value);
        alert("Koira luotu onnistuneesti")
      } else {
        alert("Virhe! Tarkista syötteesi")
      }

    }
}
