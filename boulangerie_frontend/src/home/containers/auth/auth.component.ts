import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/shared/services/items.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from 'src/store';
import { Observable } from 'rxjs';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  faRibbon = faTrash;
  data:any;

  newQuantity: number;
  productToModify: any;

  connectedUser$: Observable<User>;

  isUpdatingQuantity: boolean = false;

  message:any;
  totalcommande:any;
  public loginForm :any = FormGroup;
  public registerForm :any = FormGroup;
  get canDisplayLogin(): boolean {
    console.log(this.isLogin);
    return this.isLogin;
  };

  constructor(private authService : AuthService,
              private router: Router,
              private store: Store,
              private http:HttpClient,
              private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
    this.registerForm = new FormGroup({
      username : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl('')
    });
    this.loginForm = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    });
    if(this.store.value.connectedUser){
      this.authService.userCommands()
        .subscribe(Response => {
          this.data=Response;
          console.log(this.data);
          if (this.data.length == 0 ){
            this.totalcommande=0
          }else {
            this.totalcommande=1
          }
        });
    }
  }

  onToggleUpdateQuantity(product?:any): void {
    this.isUpdatingQuantity =!this.isUpdatingQuantity;
    if(this.isUpdatingQuantity) {
      this.newQuantity = product.quantity;
      this.productToModify = product;
    } else {
      this.newQuantity = null;
      this.productToModify = null;
    }
  }

  get r(){
    return this.registerForm.controls
  }

  get f(){
    return this.loginForm.controls
  }

  onSubmit(){
    if (this.isLogin) {
      this.authService.login(this.f['username'].value,this.f["password"].value)
        .subscribe((result) => {
          this.router.navigateByUrl('home');
        })
    } else {
      this.authService.register(this.r['username'].value,this.r["password"].value, this.f["email"].value)
        .subscribe((result) => {
          this.router.navigateByUrl('login');
        })
    }
  }

  onUpdateQuantity(){
    if (this.productToModify.quantity !== this.newQuantity) {
      this.productToModify.quantity = this.newQuantity;
      this.itemsService.updateOrderline(this.productToModify)
        .subscribe((result) => {
      this.ngOnInit();
      });
    }
  }

  deconnection(){
    localStorage.clear();
    this.store.set('connectedUser', undefined);
    this.router.navigateByUrl('home');
  }

  deletefunction(order:any){
    console.log(order);
    this.itemsService.delete(order.id).subscribe(() => this.ngOnInit());
  }

  onRegister() {
    this.isLogin = !this.isLogin;
  }
}
