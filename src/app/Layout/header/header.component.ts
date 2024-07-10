import { Component, OnInit } from '@angular/core';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../../signup/signup.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../../material-component/dialog/change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


role:any;
constructor( private router: Router,private dialog:MatDialog){

}



logout(){
  const dialogConfig= new MatDialogConfig();
   dialogConfig.panelClass="custom-dialog-container"
  dialogConfig.data={
    message:'Logout',
    confirmation:true
  };
  const dialogRef= this.dialog.open(ConfirmationComponent, dialogConfig);
  const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
    dialogRef.close();
    localStorage.clear();
    this.router.navigate(['/']);
  })
}

  changePassword(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="550px";
    dialogConfig.panelClass="custom-dialog-container"
    this.dialog.open(ChangePasswordComponent,dialogConfig);
  }

  ngOnInit(): void {
  
  }





  actions: Array<{ id: Number; text: String; icon: String }> = [
    { id: 1, text: 'My profile', icon: 'user' },
    { id: 2, text: 'Messages', icon: 'email' },
    { id: 3, text: 'Contacts', icon: 'group' },
    { id: 4, text: 'Log out', icon: 'runner' }
];
dropDownOptions = {
    height: 150
};

logAction(e:any) {
    console.log(e.itemData.text + ' was clicked');
}

logButtonClick() {
    console.log('Main button was clicked');
}

}
