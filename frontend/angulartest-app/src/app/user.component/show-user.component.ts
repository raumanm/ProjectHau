/**
 * Created by M1k1tus on 02-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { UserService } from './user.service';
import { VisitService } from '../visit.component/visit.service';
import { User } from '../classes/user';
import { Dog } from '../classes/dog';
import { Pair } from '../classes/pair';
import { UserPairedDog } from '../classes/userPairedDog';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowUserComponent implements OnInit {
  user: User;
  dogs: String[];

  constructor(appComponent: AppComponent, private userService: UserService, private route: ActivatedRoute, private vs: VisitService) {
      appComponent.titleText = "Näytä käyttäjä";
      this.dogs = [];
  }

  ngOnInit(): void {

    /*for(let f of this.user.pairedDogs) {
        console.log("oksdbfsdbsdkjbfkdsfkjsdfkjsdfkjdskjfdkjs kakka");
    }*/

    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe((user) => {
          
          let tmpPairs: Pair[];

          this.vs.getPairs().then(
              pairs => tmpPairs = pairs as Pair[]
          ).then(() => {
              for(let pair of tmpPairs) {
                  if(pair.user._id === this.user._id) {
                      //console.log(pair.dog.nameFull);
                      this.dogs.push(pair.dog.nameFull);
                  }
              }
            }  
          );

          this.user = user;
      });
  }

  onSelect(): void {
    console.log(this.user);
   }


}
