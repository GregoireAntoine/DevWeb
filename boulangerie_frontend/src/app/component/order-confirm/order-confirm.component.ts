import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TimelineItem } from 'ngx-horizontal-timeline';


@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  items: TimelineItem[] = [];
  order:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : number =1;
  api_link : string='https://admin.boulangerie.domaineprojetadmin.ovh/api';
  productdata : string=''
  orderorder:any;
  orderorderline:any;
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
    this.items.push({
      label: 'Panier',
      icon: 'fa fa-address-book-o',

      title: 'Votre panier',
      color: '16a085',
      command() {

      }
    });

    this.items.push({
      label: 'Date ',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '16a085',
      command() {
        console.log('Action 2');
      }
    });
    this.items.push({
      label: 'Vérification',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '16a085',
      command() {
        console.log('Action 2');
      }
    });
    this.items.push({
      label: 'Confirmation',
      icon: 'fa fa-plus',
      title: 'Example 2',
      active: true,
      color: '16a085',
      command() {
        console.log('Action 2');
      }
    });
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("user")+':'+localStorage.getItem("psw"))
      })
    };
    this.wait(1000);
    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/orderconfirm',httpOptions)
    .subscribe(Response => {
      this.order=Response;
      this.orderorder=this.order.order
      this.orderorderline=this.order.orderline
    });

  }

 wait(ms:any){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  }
