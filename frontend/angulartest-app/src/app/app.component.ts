import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
    selector: 'app-root',
    template:`
      <div id="container">
        <header>
          <div id="title">
            <div id="logo"></div>
            <h1 id="compName"><b>Vaasaan Kaverikoirat</b></h1>
            <h1>{{titleText}}</h1>
          </div>
          <nav>
            <div href="#" class="hamburger">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
            <ul class="clearfix menu">
              <li><a routerLink="/mainPage">Etusivu</a></li>
              <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Etsi ja muokkaa</a>
                <div class="dropdown-content">
                  <a routerLink="/searchUsers">Hae käyttäjiä</a>
                  <a routerLink="/searchDogs">Hae koiria</a>
                  <a routerLink="/search">Hae kohteita</a>
                  <a routerLink="/search">Hae käyntejä</a>
                </div>
              </li>
              <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">Lisää uusi</a>
                <div class="dropdown-content">
                  <a routerLink="/addUser">Uusi käyttäjä</a>
                  <a routerLink="/addDog">Uusi koira</a>
                  <a routerLink="/addPlace">Uusi kohde</a>
                  <a routerLink="/addVisit">Uusi käynti</a>
                </div>
              </li>
              <li><a routerLink="/reports">Raportit</a></li>
              <li><a routerLink="/message">Lähetä viesti</a></li>
            </ul>
          </nav>
        </header>
        <div id="content">
          <router-outlet></router-outlet>
        </div>
        <br/><br/>
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
