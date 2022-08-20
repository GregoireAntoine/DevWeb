import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getImageUrl(productImage: string): string {
    if(productImage) {
      return productImage;
    } else {
      return 'assets/bread.png';
    }
  }

}
