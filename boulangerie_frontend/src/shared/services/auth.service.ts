import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    console.log(this.baseRoute);
    return this.http.post(`${this.baseRoute}/login`, params)
      .pipe(
        map((result) => {
          console.log(result);
          localStorage.setItem('token', JSON.stringify(params));
          this.store.set('connectedUser', params);
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
