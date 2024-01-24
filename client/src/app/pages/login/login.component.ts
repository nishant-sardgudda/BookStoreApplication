import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  formBuilder = inject(FormBuilder);
  authService = inject(AuthServiceService);
  router = inject(Router);

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.email],
      password : ['', Validators.required]
    })
  }

  login(){
    this.authService.loginService(this.loginForm.value).subscribe({
      next:(res)=>{
        let user = res.data;
        console.log("Current user: " + user);
        if(user != null){
          alert("welcome " + user.firstName + " " + user.lastName);
          localStorage.setItem('user_id', user._id);
          this.authService.isLoggedIn$.next(true);
        }
        this.loginForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }

}
