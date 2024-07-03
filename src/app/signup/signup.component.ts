import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})


export class SignupComponent implements OnInit {

  responseMessage:any; 
  signUpForm!:FormGroup;
  submitted:boolean= false;

  constructor(private fb: FormBuilder ,
     private router: Router,
    private userService:UserService ,
    private ngxService : NgxUiLoaderService,
    private snackbarService: SnackbarService
  ){
    this.signUpForm= this.fb.group({
      firstName: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      lastName:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword:[null, [Validators.required, Validators.minLength(8)]]
    },{
      validators: this.passwordMatchValidation.bind(this)
    });

  }

  passwordMatchValidation(formGroup: FormGroup){
    const password= formGroup.get('password')?.value;
    const confirmPassword= formGroup.get('confirmPassword')?.value;
    return password===confirmPassword ? null : { passwordNotMatch : true}
  }

  ngOnInit(): void {
   
  }


  onSubmit(signUpForm:FormGroup){
    this.submitted=true;
    this.ngxService.start();
    var formData= this.signUpForm.value;

    var data={
      "firstName": formData.firstName,
      "lastName": formData.lastName,
      "email": formData.email,
      "password":formData.password
    }
    this.userService.signup(data).subscribe((response:any)=>{

      this.ngxService.stop();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"");
      this.router.navigate(['/dashboard']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage= error.error?.message;

      } else {
        this.responseMessage= GlobalConstants.error;
      }
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error)
    })

  }

  reset(){
    this.submitted=false;
    this.signUpForm.reset();
  }
}
