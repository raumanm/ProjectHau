import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Dog } from '../classes/dog';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DogService {
   dogs: Dog[] = [];
    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = 'http://konelandia.bounceme.net/dogs/';

  create(data: string): Promise<Dog> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getDogs(): Promise<Dog[]> {
    return this.http
      .get(this.getUrl).toPromise()
      .then(response => response.json() as Dog[])
      .catch(this.handleError);
  }

  getDog(id: string): Promise<Dog> {
    return this.getDogs()
      .then(dogs => dogs.find(dog => dog._id === id));
  }

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}