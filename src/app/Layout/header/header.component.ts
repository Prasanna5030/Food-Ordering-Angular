import { Component, OnInit } from '@angular/core';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


constructor( private router: Router){

}

 /* handleSignUpAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="600px";
    this.dialog.open(SignupComponent)
  } */

  ngOnInit(): void {
  
  }

  openRegistrationPage(){
    this.router.navigateByUrl("signup");
    console.log("Signup called")
  }


  openLoginPage(){
    this.router.navigateByUrl("login");
  }

}
