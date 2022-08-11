import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})


export class ArticleComponent implements OnInit {

  product:any;
  category:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : number =1;
  api_link : string='http://127.0.0.1:8000/api';
  productdata : string=''
  nmbr_article(){
    var nombre=0;
    while(nombre<51){
      this.compteur[nombre]=nombre
      nombre=nombre+1
    }
  }
  counter(i: number) {
    return new Array(i);
}
  constructor(private http:HttpClient ) {

  }


  ngOnInit(): void {

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('gregoire:antoine21')
      })
    };
    this.http.get('http://127.0.0.1:8000/api/product',httpOptions) //http://www.mocky.io/v2/5ea172973100002d001eeada
    .subscribe(Response => {
      this.product=Response;
      this.quantity_number= new Array(50)

    });

    this.http.get('http://127.0.0.1:8000/api/productcategory',httpOptions) //http://www.mocky.io/v2/5ea172973100002d001eeada
    .subscribe(Response => {
      this.category=Response;

    });

  }


}
