/**
 * Created by M1k1tus on 02-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { UserService } from './user.service';
import { User } from '../classes/user';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  //moduleId: module.id,
  selector: 'my-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ModifyUserComponent implements OnInit {
  user: User;

  constructor(appComponent: AppComponent, private userService: UserService, private route: ActivatedRoute) {
    appComponent.titleText = "Muokkaa käyttäjää";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);
  }


}
