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

@Component({
  moduleId: module.id,
  selector: 'my-add-dog-to-user',
  templateUrl: './add-dog-to-user.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class AddDogToUserComponent implements OnInit {
  user: User;
  myForm: FormGroup;

  constructor(appComponent: AppComponent, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    appComponent.titleText = "Lisää koira käyttäjälle";
  }

  ngOnInit(): void {
    //Fetch user
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);
    //TODO fetch dogs
    //TODO compare dog ids to paired dog ids
  }

  onSubmit(value: string): void {
    console.log("works");

  }


}
