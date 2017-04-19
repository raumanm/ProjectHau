/**
 * Created by M1k1tus on 02-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './user.service';
import { User } from '../classes/user';
import { AppComponent } from '../app.component';
import {UtilsClass} from "../util/utilsclass";

@Component({
  moduleId: module.id,
  selector: 'my-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyUserComponent implements OnInit {
  user: User;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Muokkaa käyttäjää";
  }

  ngOnInit(): void {
    //Fetch user
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);

    //TODO add dogs to form
    //Create form
    this.myForm = this.fb.group({
      'accessLevel': [''],
      'username': [''],
      'firstName': [''],
      'lastName': [''],
      'phone': [''],
      'email': [''],
      'memberNumber': [''],
      'qualificationDate': [''],
      'details': ['']
    });

    //Update form values
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user =>
        this.myForm.patchValue({
          accessLevel: user.accessLevel,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          memberNumber: user.memberNumber,
          qualificationDate: user.qualificationDate,
          details: user.details
        })
      );
  }

  addDogToUser() : void {
    console.log("addDog");
    this.router.navigate(['/addDogToUser', this.user._id]);
  }

  onSubmit(value: string): void {
    let everythingOk = true;
    value["_id"] = this.user._id;

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
      console.log(value);
      this.userService.create(value);
      alert("Käyttäjä lisätty onnistuneesti");
    }

  }


}
