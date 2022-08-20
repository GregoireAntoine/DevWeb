  import { Component, OnInit } from '@angular/core';
  import { CartService } from 'src/shared/services/cart.service';
  import { HttpClient } from '@angular/common/http';
  import { FormBuilder } from '@angular/forms';
  import { AuthService } from 'src/shared/services/auth.service';
  import { ItemsService } from 'src/shared/services/items.service';
  import {environment} from "../../../environments/environment";
  import {User} from "../../../shared/models/user";
  import {Observable} from "rxjs";
  import {Store} from "../../../store";

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
  selectedOption : any[]  = [];
  api_link : string='https://admin.boulangerie.domaineprojetadmin.ovh/api';
  productdata : string=''
  endroitdata:number=0;
  issou:number=0;

  numeroproduit:any;
  idleplusgrand:any;
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
  connectedUser$: Observable<User>;
  constructor(private http:HttpClient , private cartService : CartService, private itemsService: ItemsService, private formBuilder: FormBuilder, private authService: AuthService, private store: Store) {
  }


  ngOnInit(): void {
    this.user=localStorage.getItem("user")
    this.connectedUser$ = this.store.select<User>('connectedUser');

    this.itemsService.getBestSellers().subscribe(Response => {
        this.product=Response;
        this.quantity_number= new Array(50)

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
  }

  onSubmit(): void {
    // Process checkout data here
    console.log(JSON.stringify(this.messageform.value))
    this.authService.contact(this.messageform.value).subscribe(
      data => {
        if (data){
          alert("message envoyé")
        }
        // get the status as error.status
      })

    this.messageform.reset();
  }

  addtocart(item: any ,quantity: number, product_id:any){

    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }

  getURLImage(urlImage:string): string{
    if(urlImage){
      return environment.serverUrl+urlImage
    }
    else{
      return "assets/bread.png"
    }

  }

}
