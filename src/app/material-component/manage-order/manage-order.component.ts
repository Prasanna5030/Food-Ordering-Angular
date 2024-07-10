import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
// export class ManageOrderComponent implements OnInit{
  

//   displayedColumns:string[]=['productName', 'category','price','quantity','total','edit'];
//   dataSource:any=[];  //!: new MatTableDataSource<Bill>();
//   manageOrderForm!:FormGroup;
//   categories:any=[];
//   products:any=[];
//   price:any;
//   totalAmount:number=0;
//   responseMessage:any;

//   constructor(private fb: FormBuilder,
//     private categoryService: CategoryService,
//     private productService: ProductService,
//     private snackbarService: SnackbarService,
//     private billService: BillService,
//     private ngxService: NgxUiLoaderService
//   ){

//   }

//   ngOnInit(): void {
//       this.ngxService.start();
//       this.getCategories();
//       this.manageOrderForm== this.fb.group({
//          name:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
//         email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
//         contactNumber:[null, [Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
//         paymentMethod:[null,[Validators.required]],
//         category: [null, [Validators.required]],
//         quantity: [null, [Validators.required]],
//         price:[null, [Validators.required]],
//         total:[0,[Validators.required]]
//       });

//   }
//   //return the categories with only having the products 
//   getCategories() {
//     this.categoryService.getFilteredCategories().subscribe((response:any)=>{
//       this.ngxService.stop();
//       this.categories= response;
//       console.log(this.categories);
//     },(error:any)=>{
//       this.ngxService.stop();
//       console.log(error);
//       if(error.error?.message){
//         this.responseMessage=error.error?.message;
//       }else{
//         this.responseMessage= GlobalConstants.genericError;
//       }
//       this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
//     })
//   }

//   getProductsByCategory(value:any){
//     this.productService.getProductByCategoryId(value.id).subscribe((response:any)=>{
//       this.products=response;
//       this.manageOrderForm.get('price')?.setValue('');
//       this.manageOrderForm.get('quantity')?.setValue('');
//       this.manageOrderForm.get('total')?.setValue(0);
//     },(error:any)=>{
    
//       console.log(error);
//       if(error.error?.message){
//         this.responseMessage=error.error?.message;
//       }else{
//         this.responseMessage= GlobalConstants.genericError;
//       }
//       this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
//     })
//   }


//   getProductDetails(value:any){
//     this.productService.getById(value.id).subscribe((response:any)=>{
//       this.price= response.price;
  
//       this.manageOrderForm.get('price')?.setValue(response.price);
//       this.manageOrderForm.get('quantity')?.setValue('1');
//       this.manageOrderForm.get('total')?.setValue(this.price*1);
//     },(error:any)=>{
    
//       console.log(error);
//       if(error.error?.message){
//         this.responseMessage=error.error?.message;
//       }else{
//         this.responseMessage= GlobalConstants.genericError;
//       }
//       this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
//     })
//   }

//   setQuantity(value:any){
//     var temp=this.manageOrderForm.get('quantity')?.value;
//     if(temp >0){
//       this.manageOrderForm.get('total')?.setValue(this.manageOrderForm.get('quantity')?.value * this.manageOrderForm.get('price')?.value);
//     }
//     else if(temp!=''){
//       this.manageOrderForm.get('quantity')?.setValue('1');
//       this.manageOrderForm.get('total')?.setValue(this.manageOrderForm.get('quantity')?.value * this.manageOrderForm.get('price')?.value);

//     }
//   }

//   validateProductAdd(){
//     if(this.manageOrderForm.get('total')?.value === 0 || this.manageOrderForm.get('total')?.value === null || this.manageOrderForm.get('quantity')?.value <= 0){
//       return true;
//     }
//     else{
//       return false;
//     }
//   }

//   validateSubmit(){
//     if(this.totalAmount===0 || this.manageOrderForm.get('name')?.value===null ||  this.manageOrderForm.get('email')?.value===null ||  this.manageOrderForm.get('contactNumber')?.value===null  ||  this.manageOrderForm.get('paymentMethod')?.value===null)
//       return true;
    
//     else 
//     return false;
// }

// add(){
//   var formData = this.manageOrderForm.value;
//   var productName= this.dataSource.find((e:{id:number})=>e.id=== formData.product.id);

//   if(productName === undefined){
//     this.totalAmount= this.totalAmount+ formData.total;
//     this.dataSource.push({id: formData.product.id,
//                         productName: formData.product.productName,
//                         category: formData.category.category ,
//                         quantity: formData.quantity,
//                         price: formData.price,
//                         total: formData.total});

//     this.dataSource=[...this.dataSource];
//     this.snackbarService.openSnackbar(GlobalConstants.productAdded,"success");

//   }else{
//     this.snackbarService.openSnackbar(GlobalConstants.productExistError, GlobalConstants.error);

//   }
// }

// handleDeleteAction(value:any, element:any){
// this.totalAmount=this.totalAmount-element.total;
// this.dataSource.splice(value,1);
// this.dataSource=[...this.dataSource];


// }

// submitAction(){
//   var formData= this.manageOrderForm.value();
//   var data={
//     name:formData.name,
//     email: formData.email,
//     contactNumber: formData.contactNumber,
//     paymentMethod: formData.paymentMethod,
//     totalAmount:this.totalAmount.toString(),
//     productDetails:JSON.stringify(this.dataSource)

//   }

//   this.ngxService.start();
//   this.billService.generateReport(data).subscribe((response:any)=>{
//     this.downloadFile(response?.uuid);
//     this.manageOrderForm.reset();
//     this.dataSource=[];
//     this.totalAmount=0;
//   },(error:any)=>{
    
//     console.log(error);
//     if(error.error?.message){
//       this.responseMessage=error.error?.message;
//     }else{
//       this.responseMessage= GlobalConstants.genericError;
//     }
//     this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
//   })
// }
//   downloadFile(filename: string) {
//    var data={
//     uuid: filename
//    }
//    this.billService.getPdf(data).subscribe((response:any)=>{
//     saveAs(response,filename+'.pdf');
//     this.ngxService.stop()
//    })
//   }


// }

export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any[] = [];
  manageOrderForm!: FormGroup;
  categories: any[] = [];
  products: any[] = [];
  price: number = 0;
  totalAmount: number = 0;
  responseMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    private billService: BillService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.manageOrderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod: [null, [Validators.required]],
      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]]
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getFilteredCategories().subscribe((response: any) => {
      this.ngxService.stop();
      this.categories = response;
      console.log(this.categories);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
    });
  }

  getProductsByCategory(value: any) {
    this.productService.getProductByCategoryId(value.id).subscribe((response: any) => {
      this.products = response;
      this.manageOrderForm.get('price')?.setValue('');
      this.manageOrderForm.get('quantity')?.setValue('');
      this.manageOrderForm.get('total')?.setValue(0);
    }, (error: any) => {
      console.log(error);
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
    });
  }

  getProductDetails(value: any) {
    this.productService.getById(value.id).subscribe((response: any) => {
      this.price = response.price;
      this.manageOrderForm.get('price')?.setValue(response.price);
      this.manageOrderForm.get('quantity')?.setValue('1');
      this.manageOrderForm.get('total')?.setValue(this.price * 1);
    }, (error: any) => {
      console.log(error);
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
    });
  }

  setQuantity(event:Event) {
    const quantity = this.manageOrderForm.get('quantity')?.value;
    if (quantity > 0) {
      this.manageOrderForm.get('total')?.setValue(quantity * this.manageOrderForm.get('price')?.value);
    } else if (quantity !== '') {
      this.manageOrderForm.get('quantity')?.setValue('1');
      this.manageOrderForm.get('total')?.setValue(this.manageOrderForm.get('quantity')?.value * this.manageOrderForm.get('price')?.value);
    }
  }

  validateProductAdd() {
    return this.manageOrderForm.get('total')?.value === 0 || this.manageOrderForm.get('total')?.value === null || this.manageOrderForm.get('quantity')?.value <= 0;
  }

  validateSubmit() {
    return this.totalAmount === 0 || this.manageOrderForm.get('name')?.value === null || this.manageOrderForm.get('email')?.value === null || this.manageOrderForm.get('contactNumber')?.value === null || this.manageOrderForm.get('paymentMethod')?.value === null;
  }

  add() {
    const formData = this.manageOrderForm.value;
    const productExists = this.dataSource.find((e: { id: number }) => e.id === formData.product.id);
    if (!productExists) {
      this.totalAmount += formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.productName,
        category: formData.category.category,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      });
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackbar(GlobalConstants.productAdded, "success");
    } else {
      this.snackbarService.openSnackbar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(index: number, element: any) {
    this.totalAmount -= element.total;
    this.dataSource.splice(index, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    const formData = this.manageOrderForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource)
    };
    this.ngxService.start();
    this.billService.generateReport(data).subscribe((response: any) => {
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    }, (error: any) => {
      console.log(error);
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
      this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
    });
  }

  downloadFile(filename: string) {
    const data = { uuid: filename };
    this.billService.getPdf(data).subscribe((response: any) => {
      saveAs(response, filename + '.pdf');
      this.ngxService.stop();
    });
  }
}