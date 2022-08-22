import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { FormBuilder } from '@angular/forms';
import { loadTranslations } from '@angular/localize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  // définition du formulaire et de ces clés
  messageform = this.formBuilder.group({
    subject: '',
    message: ''
  });
  // Définitions des variables
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
  // Fonction permettant d'introduire les nombres pour le choix de wuantité dans des option dres selects
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




  // Lorsque l'utilisateur clique sur envoyé
  onSubmit(): void {
    const httpOptions = {
      // Définiton des paramètres de connexion à l'api
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic Z3JlZ29pcmU6YW50b2luZTIx'
      })
    };
    // Envoie des données du formulaire au format json string
    this.http.post('https://admin.boulangerie.domaineprojetadmin.ovh/api/message',JSON.stringify(this.messageform.value),httpOptions).subscribe(
      data => {
        //si le message est envoyé alors une alert prévient l'utilisateur
        if (data){
          alert("message envoyé")
        }


        })
// Remise à 0 des champs du formulaire d'envoie de message
    this.messageform.reset();
  }




// Lors dud démarrage de la page
  ngOnInit(): void {
    this.user=localStorage.getItem("user")
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('gregoire:antoine21')
      })
    };
    // Récupération des 3 produits les plus vendus.
    this.http.get('https://admin.boulangerie.domaineprojetadmin.ovh/api/bestsellers',httpOptions)
    .subscribe(Response => {
      this.product=Response;
      this.quantity_number= new Array(50)
      // Création d'un tableau permettant de séléctionner les quantité indépendemment à chaque produits
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
 // fonction d'ajout du produit dans le panier
  addtocart(item: any ,quantity: number, product_id:any){

    this.cartService.addtoCart(item,quantity);
    this.selectedOption[product_id]=1
  }







}
