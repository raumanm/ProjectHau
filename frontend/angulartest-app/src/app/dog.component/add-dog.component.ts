import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'my-add-dog',
    templateUrl: './add-dog.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddDogComponent  {
     myForm: FormGroup;

    constructor(appComponent: AppComponent, fb: FormBuilder, private dogService: DogService) {

        appComponent.titleText = "Lisää koira";

        this.myForm = fb.group({
        'nameFull': [''],
        'nameNickname': [''],
        'dateBirth': [''],
        'breed': [''],
        'registerNumber': [''],
        'status': [''],
        'dateQualification': [''],
        'dateGraduation': [''],
        'dateMedal': [''],
        'dateRetired': [''],
        'details': ['']
        });
    }

    onSubmit(value: string): void {
      let everythingOk = true;

      if(!UtilsClass.validateShortOpenField(value["nameFull"])) {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta koko nimi");
      }

      if(value['nameNickname'] !== "") {
        if(!UtilsClass.validateShortOpenField(value["nameNickname"])) {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta kutsumanimi");
        }
      }

      if(!UtilsClass.validateShortOpenField(value["breed"])) {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta rotu");
      }

      if(!UtilsClass.validateShortOpenField(value["registerNumber"])) {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta rekisterinumero");
      }

      if(!UtilsClass.validateShortOpenField(value["status"])) {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta tila");
      }

      if(value["details"] != "") {
        if(UtilsClass.validateLongOpenField(value["details"])) {
        } else {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
        }
      }

      if(UtilsClass.validateDate(value["dateBirth"])) {
        let temp = UtilsClass.createDate(value["dateBirth"]);
        value["dateBirth"] = temp;
      } else {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta syntymäaika");
      }

      if(value["dateQualification"] != "") {
        if(UtilsClass.validateDate(value["dateQualification"])) {
          let temp = UtilsClass.createDate(value["dateQualification"]);
          value["dateQualification"] = temp;
        } else {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta pätevöitymispäivämäärä");
        }
      }

      if(value["dateGraduation"] != "") {
        if(UtilsClass.validateDate(value["dateGraduation"])) {
          let temp = UtilsClass.createDate(value["dateGraduation"]);
          value["dateGraduation"] = temp;
        } else {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta valmistumispäivämäärä");
        }
      }

      if(value["dateMedal"] != "") {
        if(UtilsClass.validateDate(value["dateMedal"])) {
          let temp = UtilsClass.createDate(value["dateMedal"]);
          value["dateMedal"] = temp;
        } else {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta mitalinpäivämäärä");
        }
      }

      if(value["dateRetired"] != "") {
        if(UtilsClass.validateDate(value["dateRetired"])) {
          let temp = UtilsClass.createDate(value["dateRetired"]);
          value["dateRetired"] = temp;
        } else {
          everythingOk = false;
          alert("Virhe! Tarkista syötteesi kohdasta lopettamispäivämäärä");
        }
      }

      if(everythingOk) {
        console.log(value);
        this.dogService.create(value);
        alert("Koira luotu onnistuneesti")
      }

    }
}
