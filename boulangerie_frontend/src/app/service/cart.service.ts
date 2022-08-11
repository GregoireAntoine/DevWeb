import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[];
  public info_order : any = {};
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }




  addtoCart(product : any, quantity : number){
    var y: number = +quantity
    product.quantity=y
    console.log(y)
    var verification = true

    console.log(this.cartItemList)
    if (this.cartItemList.length == 0 ){
      console.log("pas présent 1")
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);


    }else{
      this.cartItemList.forEach((element : any) =>
      {

        if (element.name==product.name){

        element.quantity=element.quantity+product.quantity
        verification= false
      }

    }



      );

      if (verification == true){
        console.log("pas présent 2")
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
      }
    }


   /*var product_index =  this.cartItemList.indexOf(product)
    var verification = false



    if (product_index ==-1){
      console.log("pas présent")
      Object.assign(product,{quantity : quantity,total : quantity * product.price})
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);

    } else{
      console.log("présent")
      var old_quantity: number = +this.cartItemList[product_index].quantity;
      console.log(old_quantity)
       this.cartItemList[product_index].quantity= old_quantity+quantity
       console.log( this.cartItemList[product_index].quantity)
    }
    this.cartItemList.forEach((element : any) =>

      console.log( "a")


    );*/

    this.getTotalPrice();

  }



  getTotalPrice() : number{
    let grandTotal = 0;
    let grandQuantity=0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.quantity*a.price;
      grandQuantity += a.quantity;
      this.info_order.total=grandTotal
      this.info_order.quantity=grandQuantity
    })
    return grandTotal;
  }


  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  getlist(){
    return this.cartItemList
  }
}
