import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { ProductComponent } from '../product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';




interface Product {
  id: number;
  productName: string;
  price: number;
  description: string | null;
  status: boolean;
  categoryId: number;
  category: string;
}

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})



export class ManageProductComponent implements OnInit{

  displayedColumns:string[]=['productName','category', 'description', 'price', 'edit'];
  dataSource!: MatTableDataSource<Product>;
  length1:any;
  responseMessage:any;

  constructor(private productService: ProductService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private sncakbarService :  SnackbarService,
    private router : Router
  ){

  }


  tableData() {
    this.productService.getProducts().subscribe( (response: Product[]) => {
      this.dataSource = new MatTableDataSource<any>(response);
      this.ngxService.stop();
  }, (error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage= GlobalConstants.genericError
      }
      this.sncakbarService.openSnackbar(this.responseMessage,GlobalConstants.error)

    })
  }

  ngOnInit(): void {
  //  this.ngxService.start();
    this.tableData();

  }

 


  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.dataSource.filter= filterValue.trim().toLowerCase();
  }


  handleAddAction(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data={
      action: 'Add'
    };
    dialogConfig.width="550px";
    dialogConfig.panelClass="custom-dialog-container"
    const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
     this.router.events.subscribe(()=>{
      dialogRef.close();
     });

     const sub= dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
      this.tableData();
     })
  }

  handleEditAction(values:any){
    
    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data={
      action: 'Edit', 
      data:values
    };
    dialogConfig.width="850px";
    dialogConfig.panelClass="custom-dialog-container"
    const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
     this.router.events.subscribe(()=>{
      dialogRef.close();
     });

     const sub= dialogRef.componentInstance.onEditProduct.subscribe((response)=>{
      this.tableData();
     })

  }

  handleDeleteAction(values:any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.panelClass="custom-dialog-container"
    dialogConfig.data={
      message:'delete '+values.productName+' product',
      confirmation:true
    }
    const dialogRef= this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })

  }

  //deletes the product 
  deleteProduct(id:any){
  this.productService.delete(id).subscribe((response:any)=>{
    this.ngxService.stop();
    this.tableData();
    this.responseMessage= response?.message;
    this.sncakbarService.openSnackbar(this.responseMessage,"success");
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage=error.error?.message;
    }else{
      this.responseMessage= GlobalConstants.genericError
    }
    this.sncakbarService.openSnackbar(this.responseMessage,GlobalConstants.error)

  })
  }
  onChange(status:any ,id:any){
    this.ngxService.start();
    var data={
      status: status.toString(),
      id:id
    }
    this.productService.updateStatus(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage= response?.message
      this.sncakbarService.openSnackbar(this.responseMessage,"success");
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage= GlobalConstants.genericError
      }
      this.sncakbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
  
    })
  }
}
