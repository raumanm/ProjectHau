import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./stylesheets/style.css']
})

export class AppComponent {
    @Input()titleText;
}
