import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from 'src/store';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  faRibbon = faCartShopping;
  user = localStorage.getItem('user')
  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(private cartService : CartService, private store: Store) { }
  
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res =>{
        this.totalItem = res.length;
      })
  }
  
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
