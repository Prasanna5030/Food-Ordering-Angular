import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  oldPassword= true;
  newPassword= true;
  confirmPassword =true;
  changePasswordForm !: FormGroup;
  responseMessage : any ;

  constructor(private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService : NgxUiLoaderService,
    private snackbarService : SnackbarService
  ){
    
  }
  ngOnInit(): void {
    this.changePasswordForm= this.formBuilder.group({
      oldPassword: [null,[Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    },{
      validators: this.passwordMatchValidator.bind(this) 
    })
  }

  passwordMatchValidator(form:FormGroup){
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword===confirmPassword ? null : {passwordNotMatch:true}
  }

  handlePasswordChangeSubmit(){
    debugger
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword : formData.oldPassword,
      newPassword : formData.newPassword,
      confirmPassword : formData.confirmPassword
    }

    this.dashboardService.changePassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage= response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage= error.error?.message;
        
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

}
