import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {



  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm!:FormGroup;
  dialogAction:any ="Add";
  action:any ="Add";
  responseMessage:any;

constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private fb: FormBuilder,
private categoryService : CategoryService,
public dialogRef: MatDialogRef<CategoryComponent>,
private snackbarService : SnackbarService){

}

  ngOnInit(): void {
  this.categoryForm= this.fb.group({
    category: [null,[Validators.required]]
  });
  if(this.dialogData.action==='Edit'){
    this.dialogAction='Edit',
    this.action='Update' ;
    this.categoryForm.patchValue(this.dialogData.data)
  }
  }
  handleSubmit(){
    if(this.dialogAction==="Edit"){
      this.edit();
    }else{
      this.add()
    }
  }


  edit(){
    var formData = this.categoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      category: formData.category
    }
    this.categoryService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage= response?.message ;
      this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error)=>{
      this.dialogRef.close();
      if(error.error?.mesage){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    });

  }

  add(){
    var formData = this.categoryForm.value;
    var data = {
      category: formData.category
    }
    this.categoryService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage= response?.message ;
      this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error)=>{
      this.dialogRef.close();
      if(error.error?.mesage){
        this.responseMessage= error.error?.message;
      }
      else{
        this.responseMessage= GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    });
  }
}
