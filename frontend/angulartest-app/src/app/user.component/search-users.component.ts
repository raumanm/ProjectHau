/**
 * Created by M1k1tus on 02-Apr-17.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from '../classes/user';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class SearchUsersComponent  {
  users: User[] = [];
  selectedUser: User;

  constructor(appComponent: AppComponent, private userService: UserService, private router: Router) {

    appComponent.titleText = "Näytä käyttäjät";
    this.userService.getUsers().then(values=>this.addValues(values));

  }

  onSelect(user: User): void {
    this.selectedUser = user;
    this.router.navigate(['/showUser', this.selectedUser._id]);
  }

  private addValues(values: User[]) {
    this.users = values;
  }
}
