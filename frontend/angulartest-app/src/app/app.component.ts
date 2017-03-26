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
                <h1 id="header">{{titleText}}</h1>
            </header>


          <ul>
            <li><a routerLink = "/mainPage">Etusivu</a></li>

            <li class="dropdown">
              <a href="javascript:void(0)" class="dropbtn">Etsi ja muokkaa</a>
              <div class="dropdown-content">
                <a routerLink = "/search">Hae käyttäjiä</a>
                <a routerLink = "/search">Hae koiria</a>
                <a routerLink = "/search">Hae kohteita</a>
                <a routerLink = "/search">Hae käyntejä</a>
              </div>
            </li>

            <li class="dropdown">
              <a href="javascript:void(0)" class="dropbtn">Lisää uusi</a>
              <div class="dropdown-content">
                <a routerLink="/addUser">Uusi käyttäjä</a>
                <a routerLink="/addUser">Uusi koira</a>
                <a routerLink="/addUser">Uusi kohde</a>
                <a routerLink="/addUser">Uusi käynti</a>
              </div>
            </li>

            <li><a routerLink = "/report">Raportit</a></li>
            <li><a routerLink = "/message">Lähetä viesti</a></li>

          </ul>

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
    @Input()titleText;
}
