import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm!: FormGroup
  submitted:Boolean=false;
  responseMessage: any;

  constructor(private fb : FormBuilder,
              private router : Router,
              private userService : UserService,
              private ngxUILoader : NgxUiLoaderService,
              private snackbarService : SnackbarService,
              private matDialog: MatDialog
  ){
    this.loginForm= this.fb.group({
      email: [null ,[Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  
  handleLogin(formGroup : FormGroup ){
    this.ngxUILoader.start();
    var formData= this.loginForm.value;
    var data ={
      email: formData.email,
      password: formData.password
    }

    this.userService.login(data).subscribe((response:any)=>{
      
      this.ngxUILoader.stop();
      localStorage.setItem('token',response.access_token)
      this.responseMessage=response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
      this.router.navigate(['/dashboard']);
    }
  ,(error)=>{
    if(error.error?.message){
      this.ngxUILoader.stop();
      this.responseMessage= error.error?.message;

    }else{
      this.responseMessage= GlobalConstants.error;
    }
    this.snackbarService.openSnackbar(this.responseMessage,"")
    this.router.navigate(['/error']);
  })
    
  }


  openForgotPassword(){
   this.router.navigateByUrl("/forgotpassword");
  }
}
