import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { AppComponent } from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'my-modify-visit',
  templateUrl: './modify-visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyVisitComponent implements OnInit {
  visit: Visit;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private visitService: VisitService, private fb: FormBuilder, private route: ActivatedRoute) {
    appComponent.titleText = "Muokkaa käyntiä";
  }

  ngOnInit(): void {
    //Fetch visit
    this.route.params
      .switchMap((params: Params) => this.visitService.getVisit(params[('visitTime' + 'placeId')]))
      .subscribe(visit => this.visit = visit);

    //Create form
    this.myForm = this.fb.group({
      'visitTime': [''],
      'place': [''],
      'assignedPair': [''],
      'assignedPairStatus': [''],
      'details': ['']
    });

    //Update form values
    this.route.params
      .switchMap((params: Params) => this.visitService.getVisit(params[('visitTime' + 'placeId')]))
      .subscribe(visit =>
        this.myForm.patchValue({
          visitTime: visit.visitTime,
          place: visit.placeId,
          assignedPair: visit.assignedPairId,
          assignedPairStatus: visit.assignedPairStatus,
          details: visit.details
        })
      );
  }

  onSubmit(value: string): void {
    value['visitTime'] = this.visit.visitTime;
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
