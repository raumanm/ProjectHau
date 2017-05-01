import { isDevMode } from '@angular/core';
import { LoginService } from '../login.component/login.service';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Dog } from '../classes/dog';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DogService {
    dogs: Dog[] = [];

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;
    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/dogs/';

  create(data: string): Promise<Dog> {
    return this.http
      .post(this.getUrl, this.ls.getRequestBody(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  modify(id: String, data: string): Promise<Dog> {
    return this.http
      .put(this.getUrl + id, this.ls.getRequestBody(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getDogs(): Promise<Dog[]> {
    return this.http
      .get(this.getUrl, this.ls.getTokenAsPathParam()).toPromise()
      .then(response => response.json() as Dog[])
      .catch(this.handleError);
  }

  getDog(id: string): Promise<Dog> {
    return this.http
      .get(this.getUrl+id, this.ls.getTokenAsPathParam()).toPromise()
      .then(response => response.json() as Dog)
      .catch(this.handleError);
  }

    constructor(private http: Http, private ls: LoginService) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
