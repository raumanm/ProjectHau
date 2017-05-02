/**
 * Created by M1k1tus on 02-Apr-17.
 */

import {Component, Input, OnInit} from '@angular/core';
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

  @Input() password1: string;
  @Input() password2: string;

  constructor(appComponent: AppComponent, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Muokkaa käyttäjää";
  }

  ngOnInit(): void {
    //Fetch user
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.updateFormValues(user));

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
  }

  updateFormValues(user: User) : void {
    //Save user
    this.user = user;

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
          details: user.details
        })
      );

    if(this.user.qualificationDate != null && this.user.qualificationDate.toString() != "") {
      this.myForm.patchValue({
        qualificationDate: UtilsClass.createDateToBrowser(this.user.qualificationDate.toString())
      });
    }
  }

  addDogToUser() : void {
    this.router.navigate(['/addDogToUser', this.user._id]);
  }

  onSubmit(value: string, pass: String): void {
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

    console.log(this.password1);

    if(everythingOk) {
      alert("Käyttäjä muokattu onnistuneesti");
      this.userService.modify(this.user._id, value);
      this.router.navigate(['/showUser/', this.user._id]);
    }
  }
}