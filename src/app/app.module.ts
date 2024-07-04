import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { HeaderComponent } from './Layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MaterialModule } from './shared/material-module';
import { tokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { RouteGuardService } from './services/route-guard.service';
import {authInterceptorInterceptor} from './auth-interceptor.interceptor';
const ngxUILoaderConfig: NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"7b1fa2",
  fgsType:SPINNER.threeStrings,
  fgsSize:100,
  hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    DashboardComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    ErrorComponent,
    ForgotpasswordComponent
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUILoaderConfig)
    
   // SignupModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),

  //  {provide:HTTP_INTERCEPTORS,useClass:tokenInterceptorInterceptor, multi:true},
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
