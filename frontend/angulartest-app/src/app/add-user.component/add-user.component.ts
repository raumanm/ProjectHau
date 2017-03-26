import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './add-user.service';
import { User } from '../classes/user';
import { UtilsClass } from '../util/utilsclass';

@Component({
    moduleId: module.id,
    selector: 'my-add-user',
    templateUrl: 'add-user.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddUserComponent  {
      myForm: FormGroup;

    constructor(fb: FormBuilder, private userService: UserService) {
        this.myForm = fb.group({
        'accessLevel': [''],
        'username': ['Mikitus'],
        'firstName': ['Mikko'],
        'lastName': ['Luhtasaari'],
        'phone': ['0505895499'],
        'email': ['mikko.luhtasaari@hotmail.com'],
        'memberNumber': ['5435555'],
        'qualificationDate': [''],
        'details': ['']
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
