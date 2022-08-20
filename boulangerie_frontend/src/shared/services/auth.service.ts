import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import Config from 'src/app/config/serverUrls.json';
import { map, Observable } from 'rxjs';
import { Store } from 'src/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseRoute: string = environment.serverUrl + Config.prefix;
  
  constructor(
    private http: HttpClient,
    private store: Store
  ) { }
  
  login(username: string, password: string): Observable<any> {
    const params = {
      username: username,
      password: password
    }
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa(username+':'+password)
      })
    };
    return this.http.post<any>(`${this.baseRoute}/login`, params, httpOptions)
      .pipe(
        map((result) => {
          localStorage.setItem('token', JSON.stringify(result.token));
          this.store.set('connectedUser', result.user);
        })
      )
  }
  
  userCommands(): Observable<any> {
    return this.http.get(`${this.baseRoute}/mycommand`)
      .pipe(
        map((result) => {
          return result;
        })
      )
  }
  
  register() {
  
  }
  //
  // getMyAccount(): Observable<any> {
  //
  // }
  
  contact(params: any): Observable<any> {
    return this.http.post(`${this.baseRoute}/message`, params)
      .pipe(
        map((result) => {
          return result;
        })
      )
  }
}
