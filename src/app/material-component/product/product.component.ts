import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {



onAddProduct = new EventEmitter();
onEditProduct = new EventEmitter();

productForm!:FormGroup;
dialogAction:any="Add";
action:any="Add";
responseMessage:any;
categorys:any=[];

constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private fb: FormBuilder,
private productService: ProductService,
private dialogRef: MatDialogRef<ProductComponent>,
private categoryService: CategoryService,
private snackbarService: SnackbarService,
private ngxService : NgxUiLoaderService){

}

  ngOnInit(): void {

    this.productForm= this.fb.group({
      productName:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      price:[null,[Validators.required]],
      description:[null,[Validators.required]],

    })
   
    if(this.dialogData.action==="Edit"){
      this.dialogAction="Edit";
      this.action="Update";
      this.productForm.patchValue(this.dialogData.data)
    }

    this.getCategorys();
  }
getCategorys(){
  this.categoryService.getCategories().subscribe((response:any)=>{
    this.categorys= response;
  },(error:any)=>{
    if(error.error?.message){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage=GlobalConstants.genericError;
    }
    this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
  })

}

handleSubmit(){
  if(this.dialogAction==="Edit"){
    this.edit();
  }
  else{
    this.add();
  }
}


add(){

  var formData= this.productForm.value;
  var data={
    productName: formData.productName,
    categoryId: formData.categoryId,
    price : formData.price,
    description: formData.description
  }
  this.productService.add(data).subscribe((response:any)=>{
    this.dialogRef.close();
    this.onAddProduct.emit();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success");

  },(error)=>{
    this.dialogRef.close();
    if(error.error?.mesage){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage= GlobalConstants.genericError;
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })
}

edit(){

  var formData= this.productForm.value;
  var data={
    id: this.dialogData.data.id,
    productName: formData.productName,
    categoryId: formData.categoryId,
    price : formData.price,
    description: formData.description
  }
  this.productService.update(data).subscribe((response:any)=>{
    this.dialogRef.close();
    this.onAddProduct.emit();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success");

  },(error)=>{
    this.dialogRef.close();
    if(error.error?.mesage){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage= GlobalConstants.genericError;
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })


}
}
