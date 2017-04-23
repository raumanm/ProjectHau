import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { isDevMode } from '@angular/core';

import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

    public token: string;

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;
    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/authenticate';

    constructor(private http: Http) {}

    login(user: Object) {
        return this.http.post(this.getUrl, user, this.headers)
            .map((res: Response) => {
                
                let token = res.json().data.token;
                if (token) {
                    let currentUser = {
                        _id: res.json().data.userId,
                        token : token,
                        accessLevel: res.json().data.accessLevel
                    };
                    this.token = JSON.stringify(currentUser);
                    localStorage.setItem('currentUser', this.token);
                    localStorage.setItem('token', currentUser.token);
                    return true;
                } else {
                    return false;
                }
            });
    }

    public getTokenAsPathParam(): RequestOptionsArgs {
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', localStorage.getItem('token'));

        return {search: params};
    }
}