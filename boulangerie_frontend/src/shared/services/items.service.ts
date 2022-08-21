import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Config from 'src/app/config/serverUrls.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly baseRoute: string = environment.serverUrl + Config.prefix;

  constructor(
    private http: HttpClient
  ) { }


  getProducts(): Observable<any> {
  return this.http.get(`${this.baseRoute}/product`)
    .pipe(
      map((result: any) => {
        return result;
      })
    )
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseRoute}/productcategory`)
      .pipe(
        map((result: any) => {
          return result
        })
      )
  }

  getBestSellers(): Observable<any> {
    return this.http.get(`${this.baseRoute}/bestsellers`)
      .pipe(
        map((result: any) => {
          return result
        })
      )
  }

  updateOrderline(order: any): Observable<any> {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("test1234")+':'+localStorage.getItem("test1234"))
      })
    }

    return this.http.post(`${this.baseRoute}/orderline/`, order, httpOptions)
      .pipe(
        map((result: any) => {
          return result;
        })
      )
  }

  delete(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseRoute}/delete/${orderId}`)
      .pipe(
        map((result) => {
          return result;
        })
    )
  }
  sendOrder(): Observable<any> {
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("test1234")+':'+localStorage.getItem("test1234"))
      })
    }

    return this.http.delete(`${this.baseRoute}/orderconfirm/`)
      .pipe(
        map((result) => {
          return result;
        })
    )
  }
}
