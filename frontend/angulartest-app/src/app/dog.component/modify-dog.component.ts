/**
 * Created by M1k1tus on 08-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-modify-dog',
  templateUrl: './modify-dog.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyDogComponent implements OnInit {
  dog: Dog;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private dogService: DogService, private fb: FormBuilder, private route: ActivatedRoute) {
    appComponent.titleText = "Muokkaa koiraa";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.dogService.getDog(params['id']))
      .subscribe(dog => this.dog = dog);

    this.myForm = this.fb.group({
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

    // TODO after the promise is fulfilled update the form values.
    //Update form values
    this.route.params
      .switchMap((params: Params) => this.dogService.getDog(params['id']))
      .subscribe(dog =>
        this.myForm.patchValue({
          nameFull: dog.nameFull,
          nameNickname: dog.nameNickname,
          dateBirth: dog.dateBirth,
          breed: dog.breed,
          registerNumber: dog.registerNumber,
          status: dog.status,
          dateQualification: dog.dateQualification,
          dateGraduation: dog.dateGraduation,
          dateMedal: dog.dateMedal,
          dateRetired: dog.dateRetired,
          details: dog.details
        })
      );
  }

  onSubmit(value: string): void {
    console.log(value);
  }

  /*onSubmit(value: string): void {
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
   console.log(value);
   //this.userService.create(value);
   alert("Käyttäjä lisätty onnistuneesti");
   }

   }*/


}
