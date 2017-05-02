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
import { DogService } from "../dog.component/dog.service";

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

  constructor(appComponent: AppComponent,
     private dogService: DogService, 
     private userService: UserService, 
     private fb: FormBuilder, 
     private route: ActivatedRoute, 
     private router: Router) {
    appComponent.titleText = "Lisää koira käyttäjälle";
  }

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.fetchDogs(user));
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
        for(let dog of this.dogs) {
            if(!this.avaibleDogs.includes(dog)) {
                let userHasDog: boolean = false;
                for(let userDog of this.user.pairedDogs) {
                    if(dog._id == userDog._id) {
                        userHasDog = true;
                    }
                }
                if(!userHasDog) {
                    this.avaibleDogs.push(dog);
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
    this.userService.addDog(this.user._id, this.selectedDog._id);
    this.router.navigate(['/showUser', this.user._id]);
  }
}
