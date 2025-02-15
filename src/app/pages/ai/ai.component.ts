import { Component, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,CommonModule ,CarouselModule,ReactiveFormsModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AIComponent {
  loader: any;
  loaderStatus: any;
  programData: any;
  text: any;
  course_programs: any;
  programDetails: any;
  aminitiData: any;
  base_url: any;
  placementData: any;
  certificateData: any;
  constructor(@Inject(DOCUMENT) private document: Document,private Apiservice:ApiService,private router: Router,private fb: FormBuilder, private toastr: ToastrService){
 
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      const refresh = localStorage.getItem('refreshval1');      
      // console.log('counter',refresh);
      localStorage.setItem('refreshval1','false');
      if (refresh=='false') {
         localStorage.setItem('refreshval1','true');
         window.location.reload();

      }
  }
  }
  contactForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
       phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(12)
    ]),
    course:new FormControl('', Validators.required ),
    mode:new FormControl('', Validators.required ),
  })

  ngOnInit(): void { 
    this.loaderStatus=false;  
    this. programms();
    this.aminities();
    this.check();
    this.placements();
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
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    autoplay: true,             // Enable automatic sliding
    autoplayTimeout: 9000,      // Set the time interval for the slides (3 seconds in this case)
    autoplayHoverPause: true    // Pause autoplay on hover
  };
  programms(){
    this.Apiservice.programs().subscribe(
      (res:any) => {                
          if(res.success==true){        
            this.loaderStatus=true;
            this.programData=res.data 
            //this.pdata=  res.data.program.slice(-6);
            this.programData=res.data;
            this.text=res.data.programs[0].program_details;              
            this.course_programs=res.data.programs[0].course_programs ;
            let c=res.data.programs[0];          
           this.programDetails = JSON.parse(c.key_details);            
        }
        else{
          this.loaderStatus=false;
        }        
      })
  
}
aminities(){
  this.Apiservice.aminiti().subscribe(
    (res:any) => { 
      console.log('aminity',res)     
            if(res.success==true){       
              this.loaderStatus=true;
              this.aminitiData=res.data; 
              this.base_url=res.base_url              
      }
      else{
        this.loaderStatus=false;
      }
    }) 
}
placements(){
  this.Apiservice.placements().subscribe(
    (res:any) => { 
      console.log('placement',res)     
            if(res.success==true){       
              this.loaderStatus=true;
              this.placementData=res.data;   
                             
      }
      else{
        this.loaderStatus=false;
      }
    }) 
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
   course: this.contactForm.value.course,
   mode:this.contactForm.value.mode
 };

 this.Apiservice.register(data).subscribe(
   (res: any) => {
    // console.log('fjbhj')
     if (res.success) {
       this.toastr.success(res.message, "Success");
       this.contactForm.reset();
    
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
}