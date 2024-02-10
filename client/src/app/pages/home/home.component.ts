import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit{
  
  @ViewChild('cost', {static : false})
  cost !: ElementRef;
  
  authservice = inject(AuthServiceService);
  isLoggedIn : boolean = false;
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  cartService = inject(CartService);

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      console.log('inside if block');
      this.authservice.isLoggedIn$.subscribe(res=>{
        this.isLoggedIn = this.authservice.isLoggedIn();
        console.log('Logged In value: ' +this.isLoggedIn);
        if(!this.isLoggedIn){
          this.router.navigate(['login']);
        }
      })
    }else{
      console.log('inside else block');
    }
    
  }

  ngAfterViewInit(): void {
    this.cost.nativeElement.innerText;
  }

  addToCart(value: any){
    if(value === 'Angular'){
      let product = 
      {
        id : 1, img : "../../../assets/background/angular.jpeg", title : "Angular", price : 30
      };
      this.cartService.addtoCart(product);
    }
    else if(value === 'Node'){
      let product = 
      {
        id : 2, img : "../../../assets/background/node.jpeg", title : "Node JS", price : 20
      };
      this.cartService.addtoCart(product);
    }
    else if(value === 'React'){
      let product = 
      {
        id : 3, img : "../../../assets/background/react.jpeg", title : "React JS", price : 40
      };
      this.cartService.addtoCart(product);
    }
    
  }

}
