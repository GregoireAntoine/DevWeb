import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/shared/services/items.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from 'src/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  faRibbon = faTrash;
  data:any;
  user : any;
  userlogin:any;
  message:any;
  totalcommande:any;
  public myform :any = FormGroup;
  
  constructor(private authService : AuthService,
              private router: Router,
              private store: Store,
              private http:HttpClient,
              private itemsService: ItemsService) { }
  
  ngOnInit(): void {
    this.myform = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    });
    this.userlogin = localStorage.getItem("user")
    if(localStorage.getItem("user")!=""){
      this.authService.userCommands()
        .subscribe(Response => {
          this.data=Response;
          if (this.data.length == 0 ){
            this.totalcommande=0
          }else {
            this.totalcommande=1
          }
        });
    }
  }
  
  get f(){
    return this.myform.controls
  }
  
  onSubmit(){
    this.authService.login(this.f['username'].value,this.f["password"].value)
      .subscribe((result) => {
        this.router.navigateByUrl('home');
      })
  }
  
  deconnection(){
    localStorage.clear();
    this.store.set('connectedUser', undefined);
    this.router.navigateByUrl('home');
  }
  
  deletefunction(orderId:any){
    this.itemsService.delete(orderId).subscribe(() => this.ngOnInit());
  }
  
  onRegister() {
    this.isLogin = !this.isLogin;
  }
}
