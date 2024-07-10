import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {


  displayedColumns:string[] =['firstName','lastName','email', 'status'];
dataSource:any;
responseMessage:any;

constructor(private ngxService : NgxUiLoaderService,
  private categoryService: CategoryService,
  private snackbarService : SnackbarService
){

}

  ngOnInit(): void {
  this.ngxService.start();
  this.tableData();
  }


  tableData(){
    this.categoryService.getUsers().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource= new MatTableDataSource(response);
    }, (error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage= GlobalConstants.genericError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)

    })
  }

  
  applyFilter(event:Event){
   const filterValue= (event.target as HTMLInputElement).value;
   this.dataSource.filter= filterValue.trim().toLowerCase();   
  }

  onChange(status:any, id:any){
    this.ngxService.start();
    var data={
      status:status.toString(),
      id:id
    }
    
    this.categoryService.updateUsers(data).subscribe((response:any)=>{
      this.ngxService.start();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"success")
    }, (error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage= GlobalConstants.genericError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)

    })
  }

}
