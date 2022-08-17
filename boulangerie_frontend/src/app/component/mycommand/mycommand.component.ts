import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-mycommand',
  templateUrl: './mycommand.component.html',
  styleUrls: ['./mycommand.component.scss']
})
export class MycommandComponent implements OnInit {
  faRibbon = faTrash;
  data:any;
  constructor(private http:HttpClient ) { }

  ngOnInit(): void {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("user")+':'+localStorage.getItem("psw")),

      })

    };

    this.http.get("https://admin.boulangerie.domaineprojetadmin.ovh/api/mycommand",httpOptions)
    .subscribe(Response => {
      console.log(Response)
      this.data=Response;
      console.log(localStorage.getItem("user"))
    });
  }
deletefunction(valeur:any){
  const httpOptions = {

    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gregoire:antoine21'),

    })

  };
  console.log(JSON.stringify(valeur))
  this.http.post('https://admin.boulangerie.domaineprojetadmin.ovh/api/delete',JSON.stringify(valeur),httpOptions).subscribe()
  this.ngOnInit()
}
}
