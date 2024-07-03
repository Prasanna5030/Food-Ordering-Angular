import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../services/user.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  forgotPasswordForm!: FormGroup;
  responseMessage!:any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ngxUiLoader: NgxUiLoaderService,
              private userService: UserService,
              private snackbarService: SnackbarService
            
  ){
    this.forgotPasswordForm= this.fb.group({
      email:[null, [Validators.required, Validators.email]]
    })
  }

  handleForgotPassword(form: FormGroup){
    this.ngxUiLoader.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email
    }

    this.userService.forgotPassword(data).subscribe((response:any)=>{
      
      this.ngxUiLoader.stop();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
      this.router.navigate(['/'])
      
    },(error)=>{
      if(error.error?.message){
        this.ngxUiLoader.stop();
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.error
        console.log("inside error block")
      }
    
      this.snackbarService.openSnackbar(this.responseMessage,"")
    })
  }


}
