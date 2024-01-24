import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements OnInit{
  
  resetForm !: FormGroup;
  formbuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  token !: string;
  authService = inject(AuthServiceService);

  ngOnInit(): void {
    this.resetForm = this.formbuilder.group({
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required]
    },
    {
      validator : confirmPasswordValidator('password', 'confirmPassword')
    }
    );

    this.activatedRoute.params.subscribe(value=>{
      this.token = value['token'];
      console.log(this.token);
    })
  }

  reset(){
    console.log(this.resetForm.value);
    let passwordObj = {
      password : this.resetForm.value.password,
      token : this.token
    }
    console.log(passwordObj);
    this.authService.resetPasswordService(passwordObj).subscribe({
      next:(response)=>{
        alert('Password reset successfully!');
        this.resetForm.reset();
        this.router.navigate(['login']);
        console.log("Reset Password Response: " + response);
        let obj = {
          email : response.data.email,
          message : "Reset-Password"
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
        alert('Something Went Wrong!');
        console.log(err);
      }
    })
  }

}
