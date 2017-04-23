import { isDevMode } from '@angular/core';

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../classes/user';

import 'rxjs/add/operator/toPromise';
import {Dog} from "../classes/dog";

@Injectable()
export class UserService {

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;

    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/users/';

  create(data: string): Promise<User> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  addDog(data:string): Promise<Dog> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  modify(data: string): Promise<User> {
    return this.http
      .put(this.getUrl, JSON.stringify(data), {headers: this.headers})
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
    return this.http
      .get(this.getUrl+id).toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
