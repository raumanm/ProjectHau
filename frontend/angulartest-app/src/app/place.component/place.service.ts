import { isDevMode } from '@angular/core';

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Place } from '../classes/place';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlaceService {

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;

    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/places/';

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

  getPlace(id: string): Promise<Place> {
    return this.http
      .get(this.getUrl+id).toPromise()
      .then(response => response.json() as Place)
      .catch(this.handleError);
  }

  modify(data: string): Promise<Place> {
    return this.http
      .put(this.getUrl, JSON.stringify(data), {headers: this.headers})
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
