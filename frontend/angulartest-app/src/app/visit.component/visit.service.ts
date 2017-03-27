/**
 * Created by M1k1tus on 27-Mar-17.
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Visit } from '../classes/visit';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private getUrl = 'http://konelandia.bounceme.net/visits/';

  create(data: string): Promise<Visit> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}