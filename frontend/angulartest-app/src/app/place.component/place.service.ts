import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Place } from '../classes/place';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlaceService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = 'http://konelandia.bounceme.net/places/';

  create(data: string): Promise<Place> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getPlaces(): Promise<Place[]> {
    return this.http
      .get(this.getUrl).toPromise()
      .then(response => response.json() as Place[])
      .catch(this.handleError);
  }

  //TODO fetch one place from DB
  getPlace(id: string): Promise<Place> {
    return this.getPlaces()
      .then(places => places.find(place => place._id === id));
  }

  //TODO put method

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
