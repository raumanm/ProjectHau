import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class LoginService {

    private headers: Headers = new Headers();

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    login(user: Object) {
        return this.http.post('http://localhost:8080/authentication', user, this.headers);
    }
}