import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RouteGuardService } from './services/route-guard.service';
import { FullComponent } from './Layout/full/full.component';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';

const routes: Routes = [
  { path:'' , component:HomeComponent },
  { path:'cafe' , component:FullComponent, 
    children:[
      {
       path:'dashboard' , component:DashboardComponent ,canActivate:[RouteGuardService],
       data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create', 'user:create,ROLE_USER,user:read']}
       },
      {
        path:'category' , component:ManageCategoryComponent , canActivate:[RouteGuardService],
        data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create']}
      },
      {
        path:'product' , component:ManageProductComponent , canActivate:[RouteGuardService],
        data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create']}
      }, 
      {
        path:'order' , component:ManageOrderComponent , canActivate:[RouteGuardService],
        data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create', 'user:create,ROLE_USER,user:read']}
      },
      {
        path:'bill' , component:ViewBillComponent , canActivate:[RouteGuardService],
        data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create', 'user:create,ROLE_USER,user:read']}
      },
      {
        path:'user' , component:ManageUserComponent , canActivate:[RouteGuardService],
        data:{expectedRole:['user:create,user:read,admin:read,ROLE_ADMIN,admin:create']}
      }
      
    ]
         },
 

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
