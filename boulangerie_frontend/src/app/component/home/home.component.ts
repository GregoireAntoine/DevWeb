import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  messageform = this.formBuilder.group({
    subject: '',
    message: ''
  });
  user:any;
  product:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : number =1;
  api_link : string='https://admin.boulangerie.domaineprojetadmin.ovh/api';
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
  constructor(private http:HttpClient , private cartService : CartService, private formBuilder: FormBuilder) {

  }





  onSubmit(): void {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("user")+':'+localStorage.getItem("psw"))
      })
    };
    // Process checkout data here
    console.log(JSON.stringify(this.messageform.value))
    this.http.post('https://admin.boulangerie.domaineprojetadmin.ovh/api/message',JSON.stringify(this.messageform.value),httpOptions).subscribe(
      data => {

        if (data){
          alert("message envoyé")
        }

           // get the status as error.status
        })

    this.messageform.reset();
  }





  ngOnInit(): void {
    this.user=localStorage.getItem("user")
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('gregoire:antoine21')
      })
    };
    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/bestsellers',httpOptions)
    .subscribe(Response => {
      this.product=Response;
      this.quantity_number= new Array(50)

    });

  }

  addtocart(item: any ,quantity: number){

    this.cartService.addtoCart(item,quantity);
    this.selectedOption=1
  }







}
