import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

    private headers: Headers = new Headers();
    public token: string;

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        /*var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser.token;*/
    }

    login(user: Object) {
        //return this.http.post('http://localhost:8080/authentication', user, this.headers);
        return this.http.post('http://localhost:8080/authentication', user, this.headers)
            .map((res: Response) => {
                
                let token = res.json().data.token;
                if (token) {
                    let currentUser = {
                        _id: res.json().data.userId,
                        token : token,
                        accessLevel: res.json().data.accessLevel
                    };
                    this.token = JSON.stringify(currentUser);
                    localStorage.setItem('currentUser', token);
                    return true;
                } else {
                    return false;
                }
            });
    }
}