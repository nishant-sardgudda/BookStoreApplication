import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  
  authservice = inject(AuthServiceService);
  isLoggedIn : boolean = false;
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

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

}
