import { isDevMode } from '@angular/core';
import { LoginService } from '../login.component/login.service';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Place } from '../classes/place';

import { Dog } from '../classes/dog';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;
    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/';

    constructor(private http: Http, private ls: LoginService) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getReports(reportSubject: string) : Promise<any[]> {

        return this.http.get(this.getUrl + reportSubject, this.ls.getTokenAsPathParam()).toPromise().then(
            (res) => {return res.json() as Dog[]}
        );
    }
}
