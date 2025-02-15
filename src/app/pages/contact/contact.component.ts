


import { Component, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  loader: any;
  loaderStatus: any
  errorMsg: any;
  msg: any;
  constructor(@Inject(DOCUMENT) private document: Document,private Apiservice:ApiService,private router: Router,private fb: FormBuilder,private toastr: ToastrService){
 
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      const refresh = localStorage.getItem('refreshval1');      
      // console.log('counter',refresh);
      localStorage.setItem('refreshval1','false');
      if (refresh=='false') {
         localStorage.setItem('refreshval1','true');
         window.location.reload();

      // } else {
      //   localStorage.setItem('refreshval', 'true');
      //   console.log('counter not',refresh)

      // }
      }
    }
  }
  check() {
    this.loader = true;
    // Delay the execution of the rest of the function by 2000 milliseconds
    setTimeout(() => {
      // Update the loader status after the delay      
      if(this.loaderStatus==true){
        this.loader=false;
      }
      else{
        this.loader=false;
      }
    }, 1000); // 2000 milliseconds delay    
  }
  ngOnInit(): void {
    this.check();
  }
  contactForm                               = new FormGroup({
    email                               : new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]), 
    name                                : new FormControl('',[Validators.required,Validators.minLength(3)]),
    subject                             : new FormControl('',Validators.required),
    phone                               : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(12)]),
    message                             : new FormControl('',Validators.required),
     })
     contact(){
 // console.log('contact')
      if(this.contactForm.value.name==''||this.contactForm.value.email==''||this.contactForm.value.phone==''||this.contactForm.value.message==''){
        this.errorMsg="Please fill the fields ";
      }else{
    
    // var formData: any                        = new FormData();
    // formData.append('name',                 this.contactForm.value.name);
    // formData.append('email',                this.contactForm.value.email);
    // formData.append('phone_number',         this.contactForm.value.phone);
    // formData.append('message',              this.contactForm.value.message);
    let data={'name': this.contactForm.value.name,
              'email':this.contactForm.value.email,
              'phone_number': this.contactForm.value.phone,
              'message':this.contactForm.value.message
    }
   // console.log(data)
    this.Apiservice.contact(data).subscribe(
    (res:any) => {
     // console.log(data)
      
      if (res.success) {
        this.toastr.success(res.message, "Success");
        this.contactForm.reset();
     
      } else {
        this.toastr.error(res.message, "Error");
      }
    })
    }
     }
}