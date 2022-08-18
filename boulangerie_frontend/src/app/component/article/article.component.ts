import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { RouterLink } from '@angular/router';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})


export class ArticleComponent implements OnInit {
// définition des variables
  product:any;
  category:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : any[]  = [];
  api_link : string='https://admin.boulangerie.domaineprojetadmin.ovh/api';
  productdata : string=''
  user:any;
  endroitdata:number=0;
  issou:number=0;
  numeroproduit:any;
  idleplusgrand:any;

  // fonction retournant un array qui sera utilisé dans le select option de la page html Article

  counter(i: number) {
    return new Array(i);
}

  constructor(private http:HttpClient , private cartService : CartService) {

  }


  ngOnInit(): void {

// Information permettant la connexion à la base de donnée.
    const httpOptions = {

      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'https://admin.boulangerie.domaineprojetadmin.ovh/api/product?available_on_website=True',
        "Access-Control-Allow-Methods" : "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers" : "Content-Type, Authorization, X-Requested-With",
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('gregoire:antoine21')
      })

    };

    // requête de récupération des produits qui ont available_on_website =True
    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/product?available_on_website=True',httpOptions)
    .subscribe(Response => {
      this.product=Response; // mise dans la variable product des produits récupérer
      console.log("toto")
      // Fonction de récupération du plus grand id présent dans la réponse.
      this.idleplusgrand=0
      for(this.numeroproduit in this.product ){
        if (this.idleplusgrand<this.product[this.numeroproduit]['id']){
          this.idleplusgrand=this.product[this.numeroproduit]['id']
        }

      }

      // Initialsiation d'un tableau de la taille valant l'id le plus grand plus 1 qui sera utilisé lors des select option dans la page article html
      while (this.endroitdata<this.idleplusgrand+1){
        this.selectedOption[this.endroitdata]=1
        this.endroitdata+=1
      }


    });
    // Récupération des catégories de produits

    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/productcategory',httpOptions)
    .subscribe(Response => {
      this.category=Response;
      console.log("tutu")
      console.log(this.category)

    });

  }

  // Fonction d'ajout dans le panier.
  addtocart(item: any ,quantity: number, product_id:any){

    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }

  // Fonction permettant d'afficher les produits d'une catégorie spécifique sléctionnée.
  filter_product(category : any){
    console.log(category)
    sessionStorage.setItem('category', category);
  }

  // Fonction qui récupère la catégorie de produits séléctionnée et la renco
  getData(){
    return sessionStorage.getItem('category');
  }

}
