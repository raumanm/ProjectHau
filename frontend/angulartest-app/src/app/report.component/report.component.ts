import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { ReportService } from './report.service';
import { AppComponent } from '../app.component';


@Component({
moduleId: module.id,
    selector: 'my-report',
    templateUrl: './report.component.html',
    styleUrls: ['../stylesheets/style.css']
})
export class ReportComponent {
  private reportTitle: String;
  private reportContent: String[];

  constructor(appComponent: AppComponent, private route: ActivatedRoute, private reportS: ReportService) {

    this.route.params.subscribe((params: Params) => {
        let title = params['title'];

        this.reportTitle = title;
        this.getReportContent(title).then(values => this.reportContent = values);
        appComponent.titleText = title;
    });
  }

  private getReportContent(title: String): Promise<any[]> {

      let word = "";

      if(title === 'Kohdekohtainen käyntitilasto') {
          word = "places";
      } else if(title === 'Kaikkien kohteiden käyntitilasto') {
          word = "places";
      } else if(title === 'Koirakohtainen käyntitilasto') {
          word = "visits";
      } else if(title === 'Koiramäärä suhteessa optimiin') {
          word = "dogs";
      } else if(title === 'Kohteen vakikoirakot') {
          word = "dogs";
      } else if(title === 'Muokattu haku') {
          word = "users";
      }
      return this.reportS.getReports(word);
  }

  exportToExcel(){
    var saveData = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      return function (data, fileName) {
        var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"});
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };
    }());

    var data = this.reportContent,
      fileName = this.reportTitle + ".xls";

    saveData(data, fileName);
  }
}
























//   exportToExcel(){
//     var saveData = (function () {
//       var a = document.createElement("a");
//       document.body.appendChild(a);
//       return function (data, fileName) {
//         var json = JSON.stringify(data),
//           blob = new Blob([json], {type: "octet/stream"}),
//           url = window.URL.createObjectURL(blob);
//         a.href = url;
//         a.download = fileName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       };
//     }());
//
//     // var data = { search: this.fileName };
//     // saveData(data, this.fileName);
//   }
// }
