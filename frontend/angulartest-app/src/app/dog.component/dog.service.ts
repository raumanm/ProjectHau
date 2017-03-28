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

  getDog(id: number): Dog {
    /*return this.dogs
      .then(heroes => heroes.find(hero => hero.id === id));*/
    return this.dogs.find(dog => dog._id === id.toString());
  }

    constructor(private http: Http) {
        this.dogs.push(new Dog("111ID", "Bowmores Irish Cream", "Sylvi", new Date(2003,0,28), "Labradorinnoutaja", "444RN", "Active"));
        this.dogs.push(new Dog("222ID", "Jepen musta salama", "Jaska", new Date(2005,4,12), "Sekarotuinen", "231RN", "Passive"));
        this.dogs.push(new Dog("333ID", "Jaskan ruskea salama", "Jeppe", new Date(2006,6,17), "Sekarotuinen", "4475RN", "Active"));
        this.dogs.push(new Dog("444ID", "Raisan hurtta", "Musti", new Date(2003,7,22), "Kultainennoutaja", "4334RN", "Active"));

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
