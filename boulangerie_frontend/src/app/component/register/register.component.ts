import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from 'src/app/service/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public myform :any = FormGroup;

  constructor(private authService : AuthService, private http:HttpClient) { }

  ngOnInit(): void {

    this.myform = new FormGroup({
      username : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl('')
    });
  }
  get f(){
    return this.myform.controls
  }

  onSubmit(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('gregoire:antoine21')
      })
    }
    var array_register = {"username" : this.myform.value.username,"email":this.myform.value.email,"password":this.myform.value.password}
    this.http.post('http://127.0.0.1:8000/api/register',JSON.stringify(array_register),httpOptions).subscribe()
    window.location.href = "http://localhost:4200/login";
  }
   /*  this.array_register['register'] = {"username" : this.myform.value.username,"email":this.myform.value.email,"password":this.myform.value.password}
    this.http.post('http://127.0.0.1:8000/api/register',JSON.stringify(this.array_register),httpOptions).subscribe() */


}
