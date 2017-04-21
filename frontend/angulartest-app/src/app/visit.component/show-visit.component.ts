/**
 * Created by M1k1tus on 02-Apr-17.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { VisitService } from './visit.service';
import { Visit } from '../classes/visit';
import { UtilsClass } from '../util/utilsclass';
import { AppComponent } from '../app.component';

@Component({
  selector: 'my-show-visit',
  templateUrl: './show-visit.component.html',
  styleUrls: ['../stylesheets/formstyle.css']
})
export class ShowVisitComponent implements OnInit {
  visit: Visit;

  constructor(appComponent: AppComponent, private visitService: VisitService, private route: ActivatedRoute) {
    appComponent.titleText = "Näytä käynti";
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.visitService.getVisit(params['id']))
      .subscribe(visit => this.visit = visit);
  }

  onSelect(): void {
    console.log(this.visit);
   }
}
