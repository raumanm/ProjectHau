/**
 * Created by M1k1tus on 08-Apr-17.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DogService } from './dog.service';
import { Dog } from '../classes/dog';
import { AppComponent } from '../app.component';
import { UtilsClass } from "../util/utilsclass";

@Component({
  selector: 'my-modify-dog',
  templateUrl: './modify-dog.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyDogComponent implements OnInit {
  dog: Dog;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private dogService: DogService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Muokkaa koiraa";
  }

  ngOnInit(): void {
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

  onSubmit(value: string): void {
    let everythingOk = true;
    value['_id'] = this.dog._id;

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

    if(value['registerNumber'] !== "") {
      if(!UtilsClass.validateShortOpenField(value["registerNumber"])) {
        everythingOk = false;
        alert("Virhe! Tarkista syötteesi kohdasta rekisterinumero");
      }
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
      this.dogService.modify(this.dog._id, value);
      this.router.navigate(['/showDog', this.dog._id]);
    }

  }
}
