import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from 'src/store';
import { User } from 'src/shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  faRibbon = faCartShopping;
  public totalItem : number = 0;
  public searchTerm !: string;
  connectedUser$: Observable<User>;
  constructor(private cartService : CartService, private store: Store) { }
  
  ngOnInit(): void {
    this.connectedUser$ = this.store.select<User>('connectedUser');
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
