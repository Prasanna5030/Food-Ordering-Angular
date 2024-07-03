import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  { path:'' , component:HomeComponent},
  { path:'dashboard' , component:DashboardComponent},
 // { path: 'signup',loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) }

 { path:'signup' , component:SignupComponent},
  {path:'login' , component:LoginComponent},
  {path:'error', component:ErrorComponent},
 {path:'forgotpassword', component:ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
