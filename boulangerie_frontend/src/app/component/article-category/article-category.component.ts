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
  // définition des variables
  product:any;
  product2:any[]  = [];
  category:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : any[]  = [];
  api_link : string='https://admin.boulangerie.domaineprojetadmin.ovh/api';
  productdata : string=''
  a:any;
  user:any;
  numeroproduit:any;
  idleplusgrand:any;
  endroitdata:number=0;

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
        'Content-Type':  'application/json',
        'Authorization': 'Basic Z3JlZ29pcmU6YW50b2luZTIx'
      })
    };

// requête de récupération des produits qui ont available_on_website =True et qui appartienne à la bonne catégory
    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/product?available_on_website=True&product_category_id='+this.getData(),httpOptions)
    .subscribe(Response => {
      console.log(Response)
      this.product=Response;
      this.quantity_number= new Array(50)

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
    });

  }
  // Fonction d'ajout dans le panier
  addtocart(item: any ,quantity: number, product_id:any){
    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }

// Fonction permettant d'afficher les produits d'une catégorie spécifique sléctionnée.
  filter_product(category : any){

    sessionStorage.setItem('category', category);
    this.ngOnInit();
  }
  // Fonction qui récupère la catégorie de produits séléctionnée et la renvoie
  getData(){
    return sessionStorage.getItem('category');
  }
}
