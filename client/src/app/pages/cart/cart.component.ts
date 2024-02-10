import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  
  cartService = inject(CartService);
  products : any = [];
  isCartEmpty : boolean = true;
  
  ngOnInit(): void {
    this.getAllCartProducts();
  }

  getAllCartProducts(){
    this.cartService.getProducts().subscribe(res=>{
      this.products = res;
      if(this.products.length > 0){
        this.isCartEmpty = false;
      }else{
        this.isCartEmpty = true;
      }
      console.log("Items of cart: " +this.products);
    })
  }

  removeFromCart(product: any){
    this.cartService.removeCartItem(product);
    this.getAllCartProducts();
  }

}
