import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from 'src/app/service/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faRibbon = faTrash;
  data:any;
  user : any;
  userlogin:any;
  message:any;
  public myform :any = FormGroup;

  constructor(private authService : AuthService,private http:HttpClient) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    });
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("user")+':'+localStorage.getItem("psw")),

      })

    };
    this.userlogin = localStorage.getItem("user")
    if(localStorage.getItem("user")!=""){
      this.http.get("https://admin.boulangerie.domaineprojetadmin.ovh/api/mycommand",httpOptions)
      .subscribe(Response => {
        console.log(Response)
      this.data=Response;

      });
    }

  }
  get f(){
    return this.myform.controls
  }

  onSubmit(){

    this.authService.login(this.f['username'].value,this.f["password"].value)
    this.user = localStorage.getItem("token")
    }

    deconnection(){
      localStorage.setItem("user","")
      window.location.href = "https://boulangerie.domaineprojetadmin.ovh/home";
    }
    deletefunction(valeur:any){
      const httpOptions = {

        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('gregoire:antoine21'),

        })

      };



      this.http.delete('https://admin.boulangerie.domaineprojetadmin.ovh/api/delete/'+valeur+"/",httpOptions).subscribe();
      this.ngOnInit()
    }
}

