/**
 * Created by M1k1tus on 08-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { AppComponent } from '../app.component';
import {UtilsClass} from "../util/utilsclass";

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
    /*this.route.params
      .switchMap((params: Params) => this.dogService.getDog(params['id']))
      .subscribe(dog => this.dog = dog);*/
    this.route.params
      .switchMap((params: Params) => this.dogService.getDog(params['id']))
      .subscribe(dog => this.modifyDates(dog));

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

    //Update form values
    /*this.route.params
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
      );*/
  }

  onSubmit(value: string): void {
    console.log(value);
  }

  modifyDates(dog: Dog) {
    this.dog = dog;

    this.myForm.patchValue({
      nameFull: dog.nameFull,
      nameNickname: dog.nameNickname,
      breed: dog.breed,
      registerNumber: dog.registerNumber,
      status: dog.status,
      details: dog.details
    })

    if(this.dog.dateBirth != null && this.dog.dateBirth.toString() != "") {
      this.myForm.patchValue({
        dateBirth: UtilsClass.createDateToBrowser(this.dog.dateBirth.toString())
      });
    }

    if(this.dog.dateQualification != null && this.dog.dateQualification.toString() != "") {
      this.myForm.patchValue({
        dateQualification: UtilsClass.createDateToBrowser(this.dog.dateQualification.toString())
      });
    }

    if(this.dog.dateGraduation != null && this.dog.dateGraduation.toString() != "") {
      this.myForm.patchValue({
        dateGraduation: UtilsClass.createDateToBrowser(this.dog.dateGraduation.toString())
      });
    }

    if(this.dog.dateMedal != null && this.dog.dateMedal.toString() != "") {
      this.myForm.patchValue({
        dateMedal: UtilsClass.createDateToBrowser(this.dog.dateMedal.toString())
      });
    }

    if(this.dog.dateRetired != null && this.dog.dateRetired.toString() != "") {
      this.myForm.patchValue({
        dateRetired: UtilsClass.createDateToBrowser(this.dog.dateRetired.toString())
      });
    }
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
