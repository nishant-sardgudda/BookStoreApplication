import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  authservice = inject(AuthServiceService);
  //isLoggedIn : boolean = this.authservice.isLoggedIn();
  isLoggedIn : boolean = false;

  ngOnInit(): void {
    
    // let loggedIn = localStorage.getItem("user_id");
    // console.log("loggedIn value: " + loggedIn);
    // if(loggedIn){
    //   this.isLoggedIn = true;
    // }
    this.authservice.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authservice.isLoggedIn();
    })
    
  }

  logout(){
    localStorage.removeItem("user_id");
    this.authservice.isLoggedIn$.next(false);
  }

}
