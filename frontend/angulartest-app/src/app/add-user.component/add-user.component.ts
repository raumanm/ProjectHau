import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './add-user.service';
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
          everythingOk = false;
        }

        if(UtilsClass.validateEmailStart(value["email"])) {

          if(UtilsClass.validateEmail(value["email"])) {
            console.log("emailOk")
          } else {
            everythingOk = false;
          }
        } else {
          everythingOk = false;
        }

        if(UtilsClass.validateShortOpenField(value["username"]) && UtilsClass.validateShortOpenField(value["firstName"]) &&
        UtilsClass.validateShortOpenField(value["lastName"]) && UtilsClass.validateShortOpenField(value["memberNumber"])) {
          console.log("avoimetkentatok");
        } else {
          everythingOk = false;
        }

        if(UtilsClass.validateLongOpenField(value["details"])) {
          console.log("detailsok")
        } else {
          everythingOk = false;
        }

        if(UtilsClass.validatePhoneNumber(value["phone"])) {
          console.log("phoneOk");
        } else {
          everythingOk = false;
        }

        if(everythingOk) {
          console.log(value);
          this.userService.create(value);
          alert("Käyttäjä lisätty onnistuneesti");
        } else {
          alert("Virhe! Tarkista syötteesi");
        }

    }
}
