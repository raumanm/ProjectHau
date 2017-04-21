/**
 * Created by M1k1tus on 08-Apr-17.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { AppComponent } from '../app.component';
import { UtilsClass } from "../util/utilsclass";
import {Pair} from "../classes/pair";

@Component({
  selector: 'my-modify-visit',
  templateUrl: './modify-visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyVisitComponent implements OnInit {
  visit: Visit;
  myForm: FormGroup;
  pairs: Pair[];

  constructor(appComponent: AppComponent, private visitService: VisitService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Muokkaa käyntiä";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.visitService.getVisit(params['id']))
      .subscribe(visit => this.modifyDates(visit));
    this.visitService.getPairs().then(pairs=> this.addValues(pairs));

    this.myForm = this.fb.group({
      'visitTime': [''],
      'placeName': [''],
      'assignedPairId': [''],
      'assignedPairStatus': [''],
      'details': ['']
    });
  }

  addValues(values: Pair[]): void {
    this.pairs = values;
  }

  modifyDates(visit: Visit) {
    this.visit = visit;

    this.myForm.patchValue({
      placeName: visit.placeName,
      assignedPairId: visit.assignedPairId,
      assignedPairStatus: visit.assignedPairStatus,
      details: visit.details
    });

    if(this.visit.visitTime != null && this.visit.visitTime.toString() != "") {
      this.myForm.patchValue({
        visitTime: UtilsClass.createDateToBrowser(this.visit.visitTime.toString())
      });
    }
  }

  onSubmit(value: string): void {
    let everythingOk = true;

    if(value["visitTime"] != "") {
      if(UtilsClass.validateDate(value["visitTime"])) {
        let temp = UtilsClass.createDate(value["visitTime"]);
        value["visitTime"] = temp;
      } else {
        alert("Virhe! Tarkista syötteesi kohdasta vierailuaika");
        everythingOk = false;
      }
    } else {
      alert("Virhe! Tarkista syötteesi kohdasta vierailuaika");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["placeName"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kohteen nimi");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["assignedPairId"])) {
      alert("Virhe! Tarkista syötteesi kohdasta koirakko");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["assignedPairStatus"])) {
      alert("Virhe! Tarkista syötteesi kohdasta koirakon tila");
      everythingOk = false;
    }

    if(!UtilsClass.validateLongOpenField(value["details"])) {
      alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
      everythingOk = false;
    }

    if(everythingOk) {
      console.log(value);
      this.visitService.modify(value);
      this.router.navigate(['/showVisit', this.visit._id]);
    }
  }
}
