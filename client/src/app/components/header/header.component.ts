import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  authservice = inject(AuthServiceService);
  cartService = inject(CartService);
  //isLoggedIn : boolean = this.authservice.isLoggedIn();
  isLoggedIn : boolean = false;
  cartItems = 0;
 

  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authservice.isLoggedIn();
    })
    this.cartService.getProducts().subscribe(item =>{
      this.cartItems = item.length;
    })
  }

  onAddToCart(value : boolean){
    console.log("Boolean value: "+ value);
    
  }

  logout(){
    localStorage.removeItem("user_id");
    this.authservice.isLoggedIn$.next(false);
  }

}
