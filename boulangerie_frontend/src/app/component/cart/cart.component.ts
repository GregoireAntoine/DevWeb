import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { TimelineItem } from 'ngx-horizontal-timeline';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  faTrash=faTrash;
  items: TimelineItem[] = [];
  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    this.items.push({
      label: 'Panier',
      icon: 'fa fa-address-book-o',
      active: true,
      title: 'Votre panier',
      color: '16a085',
      command() {

      }
    });

    this.items.push({
      label: 'Date',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '2980b9',
      command() {
        console.log('Action 2');
      }
    });
    this.items.push({
      label: 'Vérification',
      icon: 'fa fa-plus',
      title: 'Example 2',
      color: '2980b9',
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


  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}
