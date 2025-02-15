import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
    MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule, MatSnackBarModule,ToastrModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuVisible: boolean = false;
  isModalVisible = false;
  errorMsg: any
  msg: any;
  contactForm: any;
  snackBar: any;
  

  constructor(private Apiservice:ApiService,private fb: FormBuilder,private toastr: ToastrService){
  
  this.contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });
}
  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
    console.log(this.isMenuVisible)
  }

  closeMenu() {
    this.isMenuVisible = false;
  } 

  // Function to show modal
  openModal() {
    this.isModalVisible = true;
  }

  // Function to close modal
  closeModal() {
    this.isModalVisible = false;
  }
  contact() {
    if (this.contactForm.invalid) {
     this.toastr.error("Please fill in all required fields correctly.", "Error");
     return;
   }
 
   const data = {
     name: this.contactForm.value.name,
     email: this.contactForm.value.email,
     phone_number: this.contactForm.value.phone,
     
   };
 
   this.Apiservice.register(data).subscribe(
     (res: any) => {
      // console.log('fjbhj')
       if (res.success) {
         this.toastr.success(res.message, "Success");
         this.contactForm.reset();
      this.closeModal();
       } else {
         this.toastr.error(res.message, "Error");
       }
     },
     (error: any) => {
       console.error(error);
       this.toastr.error("An error occurred. Please try again.", "Error");
     }
   );
 }

    // var formData: any                        = new FormData();
    // formData.append('name',                 this.contactForm.value.name);
    // formData.append('email',                this.contactForm.value.email);
    // formData.append('phone_number',         this.contactForm.value.phone);
    // formData.append('message',              this.contactForm.value.message);
    // let data={'name': this.contactForm.value.name,
    //           'email':this.contactForm.value.email,
    //           'phone_number': this.contactForm.value.phone,
    //           // 'message':this.contactForm.value.message
    // }
   // console.log('data',data)
    // this.Apiservice.register(data).subscribe(
    // (res:any) => {
    // if(res.success==true){           
    //   this.msg=res.message;
    // }else{
    //   this.errorMsg=res.message;
    //   //console.log('erro');
    // }
    // (error: any) => {
    //   // Error: Handle API call error
    //   console.error(error);
    //   // this.isLoading = false;   
    //    this.errorMsg=error;
    // }
    // })
   // }
  
  }
