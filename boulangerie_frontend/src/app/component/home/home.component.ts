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

  product:any;
  products: any[]  = [];
  compteur: any[]  = [];
  quantity_number: any[]  = [];
  selectedOption : number =1;
  api_link : string='http://127.0.0.1:8000/api';
  productdata : string=''


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
    this.http.post('http://127.0.0.1:8000/api/message',JSON.stringify(this.messageform.value),httpOptions).subscribe()
    //console.warn('Your order has been submitted', this.messageform.value.message);
    this.messageform.reset();
  }





  ngOnInit(): void {



  }




}
