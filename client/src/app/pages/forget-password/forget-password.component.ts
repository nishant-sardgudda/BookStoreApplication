import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit{

  forgetPwdForm !: FormGroup;
  fb = inject(FormBuilder);
  authservice = inject(AuthServiceService);

  ngOnInit(): void {
    this.forgetPwdForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  submit(){
    console.log(this.forgetPwdForm.value);
    let obj = {
      email : this.forgetPwdForm.value.email
    }
    this.authservice.resetEmailService(obj).subscribe({
      next: (res)=>{
        alert(res.message);
        this.forgetPwdForm.reset();
      },
      error:(err)=>{
        alert(err.error.message);
      }
    })
  }

  cancel(){
    this.forgetPwdForm.reset();
  }

}
