import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetComponent } from './pages/reset/reset.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {path : '', component : WelcomeComponent},
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : 'home', component : HomeComponent},
    {path : 'forget-password', component : ForgetPasswordComponent},
    {path : 'reset/:token', component : ResetComponent},
    {path : 'cart', component : CartComponent}
    
];
