/**
 * Created by M1k1tus on 27-Mar-17.
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Visit } from '../classes/visit';

import 'rxjs/add/operator/toPromise';
import {Pair} from "../classes/pair";

@Injectable()
export class VisitService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private getUrl = 'http://konelandia.bounceme.net/visits/';
  private getPairsUrl = 'http://konelandia.bounceme.net/pairs/';

  create(data: string): Promise<Visit> {
    return this.http
      .post(this.getUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getVisits(): Promise<Visit[]> {
    return this.http
      .get(this.getUrl).toPromise()
      .then(response => response.json() as Visit[])
      .catch(this.handleError);
  }

  getVisit(id: string): Promise<Visit> {
    return this.http
      .get(this.getUrl+id).toPromise()
      .then(response => response.json() as Visit)
      .catch(this.handleError);
  }

  getPairs(): Promise<Pair[]> {
    return this.http
      .get(this.getPairsUrl).toPromise()
      .then(response => response.json() as Pair[])
      .catch(this.handleError);
  }

  modify(data: string): Promise<Visit> {
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
