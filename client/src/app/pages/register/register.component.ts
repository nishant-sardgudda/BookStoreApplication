import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  formBuilder = inject(FormBuilder);
  authService = inject(AuthServiceService);
  router = inject(Router);


  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      userName : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    },
    {
      validator : confirmPasswordValidator('password', 'confirmPassword')
    }
    )
  }

  register(){
    console.log(this.registerForm.value);
    let email = this.registerForm.value.email;
    this.authService.registerService(this.registerForm.value).subscribe({
      next:(res)=>{
        alert("User Registered Successfully!");
        this.registerForm.reset();
        this.router.navigate(['login']);
        let obj = {
          email : email,
          message : "Register"
        }
        this.authService.successEmailService(obj).subscribe({
          next:(res)=>{
            console.log('Register Email sent successfully!');
          },
          error :(err)=>{
            console.log('Email error: ' + err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
