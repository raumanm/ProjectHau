import { isDevMode } from '@angular/core';

import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptionsArgs } from '@angular/http';

import { User } from '../classes/user';

import { LoginService } from '../login.component/login.service';
import 'rxjs/add/operator/toPromise';
import {Dog} from "../classes/dog";

@Injectable()
export class UserService {

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;

    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/users/';
    private params: URLSearchParams = new URLSearchParams();

  create(data: string): Promise<User> {
    let token = localStorage.getItem('token');
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers, search: "token=" + token})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  addDog(data:string): Promise<Dog> {
    let token = localStorage.getItem('token');
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers, search: "token=" + token})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  modify(data: string): Promise<User> {
    let token = localStorage.getItem('token');
    return this.http
      .put(this.getUrl, JSON.stringify(data), {headers: this.headers, search: "token=" + token})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.getUrl, this.loginService.getTokenAsPathParam()).toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }
  getUser(id: string): Promise<User> {
    return this.http
      .get(this.getUrl+id, this.loginService.getTokenAsPathParam()).toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

    constructor(private http: Http, private loginService: LoginService) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
