import { Component, OnInit } from '@angular/core';
import {ItemsService} from "src/shared/services/items.service";
import {CartService} from "src/shared/services/cart.service";
import { Store } from 'src/store';
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category:any;
  products: any[]  = [];
  displayedProducts: any[] = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : any[]  = [];
  productdata : string=''
  endroitdata:number=0;
  issou:number=0;
  numeroproduit:any;
  idleplusgrand:any;

  connectedUser$: Observable<User>;
  selectedCategory: any;

  // fonction retournant un array qui sera utilisé dans le select option de la page html Article

  counter(i: number) {
    return new Array(i);
  }

  constructor(private cartService : CartService, private itemsService: ItemsService, private store:Store) {}


  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');

  if(this.store.value.connectedUser) {
    this.itemsService.getProducts().subscribe((result) => {
      this.products = result; // mise dans la variable product des produits récupérés
      this.displayedProducts = result;
      // Fonction de récupération du plus grand id présent dans la réponse.

      this.idleplusgrand = this.products.reduce(function(prev, current) {
        return (prev.y > current.y) ? prev : current
      }).id

      // Initialsiation d'un tableau de la taille valant l'id le plus grand plus 1 qui sera utilisé lors des select option dans la page article html
      while (this.endroitdata<this.idleplusgrand+1){
        this.selectedOption[this.endroitdata]=1
        this.endroitdata+=1
      }
    })

    // Récupération des catégories de produits
    this.itemsService.getCategories().subscribe((result) => {
      this.category = result;
    })
  }
  }

  getImageUrl(productImage: string): string {
    if(productImage) {
      return productImage;
    } else {
      return 'assets/bread.png';
    }
  }

  // Fonction d'ajout dans le panier.
  addtocart(item: any ,quantity: number, product_id:any){

    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }

  setAllFilter(): void {
    this.displayedProducts = this.products;
  }

  // Fonction permettant d'afficher les produits d'une catégorie spécifique sléctionnée.
  filter_product(categoryId : any){
    this.selectedCategory = categoryId;
    this.displayedProducts = this.products.filter(p => p.product_category_id === categoryId )
  }
}
