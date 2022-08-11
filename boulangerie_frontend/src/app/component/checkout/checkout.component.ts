import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { TimelineItem } from 'ngx-horizontal-timeline';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})


export class CheckoutComponent implements OnInit {
  items: TimelineItem[] = [];
  public products : any = [];
  public grandTotal : any;
  public grandQuantity : any;
  public date_takeaway : any;
  public takeaway : any;
  public reservation : any;
  public donnee : any;
  public donneeline : any;
  public tab: any = [];
  public array_order: any = {};
  constructor(private cartService : CartService,private http:HttpClient) { }

  ngOnInit(): void {
    this.items.push({
      label: 'Panier',
      icon: 'fa fa-address-book-o',
      title: 'Votre panier',
      color: '16a085',
      command() {

      }
    });

    this.items.push({
      label: 'Date',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '16a085',
      command() {
        console.log('Action 2');
      }
    });
    this.items.push({
      label: 'Vérification',
      icon: 'fa fa-plus',
      active: true,
      title: 'Example 2',
      color: '16a085',
      command() {
        console.log('Action 2');
      }
    });
    this.items.push({
      label: 'Confirmation',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '2980b9',
      command() {
        console.log('Action 2');
      }
    });


    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.date_takeaway=this.cartService.info_order.date
      this.grandTotal = this.cartService.info_order.total
      this.grandQuantity = this.cartService.info_order.quantity
    })
  }

  postfunction(){
    console.log("toto")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(localStorage.getItem("user")+':'+localStorage.getItem("psw"))
      })
    }
    this.takeaway=this.date_takeaway.toISOString().split('T')[0]
    this.reservation= new Date().toISOString().split('T')[0]



    this.array_order['order'] = {"date_order" : this.reservation,"date_takeaway":this.takeaway,"total_price":this.grandTotal,"total_quantity":this.grandQuantity }

    //this.http.post('http://127.0.0.1:8000/api/order',this.donnee,httpOptions).subscribe()

    this.array_order['orderline']=[]

    this.cartService.cartItemList.forEach((element : any) =>
    {
      this.array_order['orderline'].push({"product_id": element.id,"quantity": element.quantity,"price":element.price})
      //this.http.post('http://127.0.0.1:8000/api/orderline',this.donneeline,httpOptions).subscribe()
      console.log(JSON.stringify(this.array_order))


  }



    );

console.log(JSON.stringify(this.array_order))
this.http.post('http://127.0.0.1:8000/api/order',JSON.stringify(this.array_order),httpOptions).subscribe()
this.cartService.removeAllCart()





  }

}
