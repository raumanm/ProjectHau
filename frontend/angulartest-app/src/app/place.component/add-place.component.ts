import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppComponent } from '../app.component';

import { PlaceService } from './place.service';
import { Place } from '../classes/place';

import { User } from '../classes/user';
import { UserService } from '../user.component/user.service';
import { UtilsClass } from '../util/utilsclass';



@Component({
    moduleId: module.id,
    selector: 'my-add-place',
    templateUrl: 'add-place.component.html',
    styleUrls: ['../stylesheets/formstyle.css']
})
export class AddPlaceComponent implements OnInit {
  myForm: FormGroup;
  users: User[];

  constructor(appComponent: AppComponent, fb: FormBuilder, private placeService: PlaceService, private userService: UserService) {

    appComponent.titleText = "Lisää kohde";

    this.myForm = fb.group({
      'name': ['Tuonelan vanhainkoti'],
      'addressStreet': ['Helvetinjärvenkatu 66'],
      'addressCode': ['33560'],
      'addressCity': ['Tampere'],
      'visitationInterval': [''],
      'pairAmount': ['2'],
      'overseerId': [''],
      'details': ['Ihan ihme paikka']
    });
  }

  ngOnInit(): void {
  this.userService.getUsers().then(users => this.users = users);
  }

  onSubmit(value: string): void {
    let everythingOk = true;

    if(!UtilsClass.validateShortOpenField(value["name"])) {
      alert("Virhe! Tarkista syötteesi kohdasta nimi");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["addressStreet"])) {
      alert("Virhe! Tarkista syötteesi kohdasta katuosoite");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["addressCity"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kaupunki");
      everythingOk = false;
    }

    if(!UtilsClass.validateShortOpenField(value["overseerId"])) {
      alert("Virhe! Tarkista syötteesi kohdasta kohdevastaava");
      everythingOk = false;
    }

    if(!UtilsClass.validateZipCode(value["addressCode"])) {
      alert("Virhe! Tarkista syötteesi kohdasta postinumero. Postinumerossa on viisi numeroa väliltä 0-9");
      everythingOk = false;
    }

    if(!UtilsClass.validatePairAmount(value["pairAmount"])) {
      alert("Virhe! Tarkista syötteesi kohdasta optimikoirakkomäärä. Optimikoirakkomäärän tulee olla väliltä 1-9");
      everythingOk = false;
    }

    if(value["details"] != "") {
      if(!UtilsClass.validateLongOpenField(value["details"])) {
        alert("Virhe! Tarkista syötteesi kohdasta lisätietoja");
        everythingOk = false;
      }
    }

    if(everythingOk) {
      this.placeService.create(value);
      alert("Kohde lisätty onnistuneesti");
    }
  }
}
