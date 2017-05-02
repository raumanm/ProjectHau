import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './user.service';
import { User } from '../classes/user';
import { UtilsClass } from '../util/utilsclass';

import { AppComponent } from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'my-add-user',
    templateUrl: 'add-user.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddUserComponent  {
      myForm: FormGroup;

    constructor(appComponent: AppComponent, fb: FormBuilder, private userService: UserService) {

        appComponent.titleText = "Lisää käyttäjä";

        this.myForm = fb.group({
        'accessLevel': [''],
        'username': ['JaskanKoiruleet'],
        'firstName': ['Jaakko'],
        'lastName': ['Jaskanen'],
        'phone': ['063121582'],
        'email': ['jaskankoirat@luukku.com'],
        'memberNumber': ['5366364'],
        'qualificationDate': [''],
        'details': ['Tietoja']
        });
    }

    onSubmit(value: string): void {
        let everythingOk = true;

        if(UtilsClass.validateDate(value["qualificationDate"])) {
          let temp = UtilsClass.createDate(value["qualificationDate"]);
          value["qualificationDate"] = temp;
        } else {
          alert("Virhe! Tarkista syötteesi kohdasta pätevöitymispäivämäärä");
          everythingOk = false;
        }

        if(UtilsClass.validateEmailStart(value["email"].substring(0,1))) {

          if(UtilsClass.validateEmail(value["email"])) {
          } else {
            alert("Virhe! Tarkista syötteesi kohdasta sähköposti");
            everythingOk = false;
          }
        } else {
          alert("Virhe! Tarkista syötteesi kohdasta sähköposti");
          everythingOk = false;
        }

        if(!UtilsClass.validateShortOpenField(value["username"])) {
          alert("Virhe! Tarkista syötteesi kohdasta käyttäjänimi");
          everythingOk = false;
        }

        if(!UtilsClass.validateShortOpenField(value["firstName"])) {
          alert("Virhe! Tarkista syötteesi kohdasta etunimi");
          everythingOk = false;
        }

        if(!UtilsClass.validateShortOpenField(value["lastName"])) {
          alert("Virhe! Tarkista syötteesi kohdasta sukunimi");
          everythingOk = false;
        }

        if(!UtilsClass.validateShortOpenField(value["memberNumber"])) {
          alert("Virhe! Tarkista syötteesi kohdasta jäsennumero");
          everythingOk = false;
        }

        if(!UtilsClass.validateLongOpenField(value["details"])) {
          alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
          everythingOk = false;
        }

        if(!UtilsClass.validatePhoneNumber(value["phone"])) {
          alert("Virhe! Tarkista syötteesi kohdasta puhelinnumero");
          everythingOk = false;
        }

        if(everythingOk) {
          this.userService.create(value);
          alert("Käyttäjä lisätty onnistuneesti");
        }

    }
}
