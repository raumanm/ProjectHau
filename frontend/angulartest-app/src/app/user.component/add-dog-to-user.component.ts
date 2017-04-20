/**
 * Created by M1k1tus on 19-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from './user.service';
import { User } from '../classes/user';
import { Dog } from '../classes/dog';
import { AppComponent } from '../app.component';
import {UtilsClass} from "../util/utilsclass";
import {DogService} from "../dog.component/dog.service";

@Component({
  moduleId: module.id,
  selector: 'my-add-dog-to-user',
  templateUrl: './add-dog-to-user.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class AddDogToUserComponent implements OnInit {
  user: User;
  dogs: Dog[];
  selectedDog: Dog;
  avaibleDogs: Dog[] = [];
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private dogService: DogService, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Lisää koira käyttäjälle";
  }

  ngOnInit(): void {
    //Fetch user
    /*this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);*/
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.fetchDogs(user));
    //TODO fetch dogs
    //TODO compare dog ids to paired dog ids
  }

  fetchDogs(user: User): void {
    this.user = user;
    this.route.params
      .switchMap((params: Params) => this.dogService.getDogs())
      .subscribe(dogs => this.compareDogs(dogs));
  }

  compareDogs(dogs: Dog[]): void {
    this.dogs = dogs;
    if(this.user.pairedDogs != null) {
      for (let i = 0; i < dogs.length; i++) {
        for (let j = 0; j < this.user.pairedDogs.length; j++) {
          if (dogs[i]._id != this.user.pairedDogs[j]._id) {
            this.avaibleDogs.push(this.dogs[i]);
          }
        }
      }
    } else {
      this.avaibleDogs = dogs;
    }
  }

  onSelect(selectedDog: Dog): void {
    this.selectedDog = selectedDog;
  }

  submitSelect(): void {

  }


}
