import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  
   date= new Date().getFullYear();
constructor(private userServices: UserService,
  private router: Router,

){

}

  ngOnInit(): void {
    debugger
    this.userServices.checkToken().subscribe((response:any)=>{
      this.router.navigate(['/cafe/dashboard']);
    },(error:any)=>{
      console.log(error)
    })
  }


  
  openRegistrationPage(){
    this.router.navigateByUrl("signup");
    console.log("Signup called")
  }


  openLoginPage(){
    this.router.navigateByUrl("login");
  }

}
