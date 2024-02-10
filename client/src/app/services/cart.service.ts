import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList : any=[];
  productList = new BehaviorSubject<any>([]);

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(){
    let grandTotal = 0;
    this.cartItemList.map((a: any)=>{
      grandTotal += a.total;
    })
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id == a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAll(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}
