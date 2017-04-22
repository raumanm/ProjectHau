import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

    constructor(private http: Http) {}

    login(user: Object) {
        //return this.http.post('http://localhost:8080/authentication', user);
        return user;
    }
}