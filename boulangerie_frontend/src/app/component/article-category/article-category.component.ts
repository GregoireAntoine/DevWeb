import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.scss']
})
export class ArticleCategoryComponent implements OnInit {
  product:any;
  product2:any[]  = [];
  category:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : any[]  = [];
  api_link : string='http://127.0.0.1:8000/api';
  productdata : string=''
  a:any;
  user:any;
  numeroproduit:any;
  idleplusgrand:any;
  endroitdata:number=0;
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
  constructor(private http:HttpClient , private cartService : CartService) {

  }


  ngOnInit(): void {
    this.user=localStorage.getItem("user")
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic Z3JlZ29pcmU6YW50b2luZTIx'
      })
    };


    this.http.get('http://127.0.0.1:8000/api/product?available_on_website=True&product_category_id='+this.getData(),httpOptions)
    .subscribe(Response => {
      console.log(Response)
      this.product=Response;
      this.quantity_number= new Array(50)

      this.idleplusgrand=0
      for(this.numeroproduit in this.product ){
        if (this.idleplusgrand<this.product[this.numeroproduit]['id']){
          this.idleplusgrand=this.product[this.numeroproduit]['id']
        }

      }

      while (this.endroitdata<this.idleplusgrand+1){
        console.log( "salut")
        this.selectedOption[this.endroitdata]=1
        this.endroitdata+=1
      }
    });

    this.http.get('http://127.0.0.1:8000/api/productcategory',httpOptions)
    .subscribe(Response => {
      this.category=Response;
    });

  }

  addtocart(item: any ,quantity: number, product_id:any){
    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }

  filter_product(category : any){

    sessionStorage.setItem('category', category);
    this.ngOnInit();
  }
  getData(){
    return sessionStorage.getItem('category');
  }
}
