import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';
import {Router} from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
export class AuthService {

    api_url:string="http://127.0.0.1:8000/api/token/"
    constructor(private http:HttpClient,private route:Router){}

    login(username:string,password:string){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(username+':'+password)
        })
      }
      return this.http.post<any>(this.api_url,JSON.stringify({'username':username,'password':password}),httpOptions).subscribe(
           data => {
            this.updateData(data['access']);
            localStorage.setItem("user", username)
            localStorage.setItem("psw", password)
            //this.route.navigate(['/products']);
            window.location.href = "http://localhost:4200/home";
            console.log(this.getmyaccount())
          }
         );

    }

    private updateData(token:string) {
      localStorage.setItem("token", token)
    }

    private getmyaccount(){
      const token = localStorage.getItem("token")
      const headers_account = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic '+token
      })

      const api_url:string="http://127.0.0.1:8000/api/myaccount"

      return this.http.get(api_url,{headers : headers_account}).subscribe()
    }
  }
