import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.scss'
})
export class ViewBillComponent implements OnInit{


  displayedColumns:string[]=['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource:any;
  responseMessage:any;
  
  constructor(private billService : BillService, private ngxService : NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  
  }
  tableData() {
   this.billService.getBills().subscribe((response:any)=>{
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

  handleViewAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      data:values
    }
    dialogConfig.width="100%";
    const dialogRef= this.dialog.open(ViewBillComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.panelClass="custom-dialog-container"
    dialogConfig.data= {
      message:'delete '+values.name+' bill',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteBill(values.id);
      dialogRef.close();

    })
  }

  deleteBill(id:any){
    this.billService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage= response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"success");
    },(error)=>{
      if(error.error?.message){
        this.responseMessage= error.error?.message
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }


  downloadReportAction(values:any){
    this.ngxService.start();
    var data={
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total.toString(),
      productDetails:values.productDetail
    }
    this.downloadfile(values.uuid,data);
    
  }

  downloadfile(filename:string, data:any){
    this.billService.getPdf(data).subscribe((response:any)=>{
      saveAs(response,filename+'.pdf');
      this.ngxService.stop();
    })


  }
}