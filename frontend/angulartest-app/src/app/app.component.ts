import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    template:`
        <div id="container">
            
            <header>
                <div id="logo"></div>
                <h1 id="header">Otsikko</h1>
            </header>
            
            <div id="content">
                <router-outlet></router-outlet>
            </div>
            
            <footer>
                <strong id="contactInfo">Ota yhteyttä: kaverikoirat.vaasa@gmail.com</strong>
                <p id="copyRight">Copyright &copy; 2017 Vaasanseudun kaverikoirat - All Rights Reserved.
                <br> Design by Tampere University of Applied Sciences: Team Hau!</p>
            </footer>
            
        </div>
    `,
    styleUrls: ['./stylesheets/style.css']
})
export class AppComponent {
}
