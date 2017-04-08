import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../classes/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = 'http://konelandia.bounceme.net/users/';

  create(data: string): Promise<User> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.getUrl).toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: string): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user._id === id));
  }

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
