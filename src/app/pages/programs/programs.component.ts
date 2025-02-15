import {Component, ElementRef, QueryList, ViewChildren, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,CommonModule ,CarouselModule,ReactiveFormsModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {
  loader: any;
  loaderStatus:any;
  programData: any;
  base_url: any;
  course_programs: any;
  baseurl: any;
  programDetails: any;
  text: any;
  testData: any;
  faqData: any;
  errorMsg: any;
  msg: any;
  aminitiData: any;
  certificateData: any;
  placementData: any;
  showContent = false;
  @ViewChildren('content') contents!: QueryList<ElementRef>;
  constructor(@Inject(DOCUMENT) private document: Document,private Apiservice:ApiService,private router: Router,private fb: FormBuilder,private toastr: ToastrService){
 
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
  ngOnInit(): void {  
    this.loaderStatus=false; 
    this.programms();
    this.faq();
    this.what_we();
    this.testimonial(); 
    this.aminities(); 
    this.certificates();
    this.placements();
    this.check();
    
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
  generateUniqueId(index: number): string {
    return 'accordion' + index;
  }
  what_we(){
    this.Apiservice.whatWe().subscribe(
      (res:any) => {  
        
        if(res.success==true){ 
        
          this.loaderStatus=true;         
          this.baseurl=res.base_url;    
        }
        else{
          this.loaderStatus=false;
        }
      })
  } 
  testimonial(){
    this.Apiservice.testimonial().subscribe(
      (res:any) => { 
              if(res.success==true){       
                this.loaderStatus=true;
                this.testData=res.data;               
        }
        else{
          this.loaderStatus=false;
        }
      }) 
  }
  faq(){
    this.Apiservice.faq().subscribe(
      (res:any) => {      
              if(res.success==true){       
                this.loaderStatus=true;
                this.faqData=res.data;               
        }
        else{
          this.loaderStatus=false;
        }
      }) 
  }
  contactForm                               = new FormGroup({
  email                               : new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]), 
  name                                : new FormControl('',[Validators.required,Validators.minLength(3)]),
  phone                               : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(12)]),
  course:new FormControl('', Validators.required ),
    mode:new FormControl('', Validators.required ),
   })
 

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 2
    },
    940: {
      items: 2
    }
  },
  autoplay: true,             // Enable automatic sliding
  autoplayTimeout: 3000,      // Set the time interval for the slides (3 seconds in this case)
  autoplayHoverPause: true    // Pause autoplay on hover
};
clientData= [
    {
      "name": "Client A",
      "logo": "assets/img/eme.png",      
    },
    {
      "name": "Client B",
      "logo": "path/to/logo-b.png",      
    },
    {
      "name": "Client C",
      "logo": "path/to/logo-c.png",     
    }
    // Add more clients as needed
  ]

customOptions1: OwlOptions = {
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
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  autoplay: true,             // Enable automatic sliding
  autoplayTimeout: 3000,      // Set the time interval for the slides (3 seconds in this case)
  autoplayHoverPause: true    // Pause autoplay on hover
};
aminities(){
  this.Apiservice.aminiti().subscribe(
    (res:any) => { 
       
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
certificates(){
  this.Apiservice.certifications().subscribe(
    (res:any) => { 
     
            if(res.success==true){       
              this.loaderStatus=true;
              this.certificateData=res.data;                               
      }
      else{
        this.loaderStatus=false;
      }
    }) 
}
placements(){
  this.Apiservice.placements().subscribe(
    (res:any) => { 
     
            if(res.success==true){       
              this.loaderStatus=true;
              this.placementData=res.data;   
                   
      }
      else{
        this.loaderStatus=false;
      }
    }) 
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
contact() {
  //console.log(this.contactForm.value)
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
    
     this.toastr.error("An error occurred. Please try again.", "Error");
   }
 );
}
toggleContent() {
  this.showContent = !this.showContent;
}
accordionItems = [
  {
    question: 'What makes the cyber security courses unique?',
    answer: 'Experts Skill Merge combines theoretical knowledge with hands-on practical training to ensure students learn the latest in cybersecurity while gaining real-world experience.',
    isOpen: false,
  },
  {
    question: 'What topics are covered in the courses?',
    answer: 'The courses include network security, ethical hacking, penetration testing, cryptography, and incident response.',
    isOpen: false,
  },
  {
    question: 'Do the courses provide any industry-recognized certifications?',
    answer: 'Yes, certifications like CEH, CompTIA Security+, and GIAC Security Essentials Certification (GSEC) are available.',
    isOpen: false,
  },
  {
    question:'What kind of practical training is included in the courses?',
    answer: 'The courses focus on practical training. Students work on real scenarios and use the latest tools. This way, they learn by doing.',
    isOpen: false,
  },
  {
    question:'Do the courses offer any internship or job placement assistance?',
    answer: 'Yes, Experts Skill Merge helps with internships and jobs. They have strong connections in the industry. This helps students get real-world experience and find jobs.',
    isOpen: false,
  }  ,
  {
    question:'What is the duration of the cyber security courses?',
    answer: 'The course lengths vary. Experts Skill Merge offers short and long courses. This flexibility helps students fit learning into their schedules.',
    isOpen: false,
  },
  {
    question:'Are there any prerequisites for enrolling in the cyber security courses?',
    answer: "The courses are open to many backgrounds. You don't need to be a tech expert to start. Basic computer knowledge is helpful, though.",
    isOpen: false,
  },
  {
    question:'What are the career prospects after completing the cyber security courses?',
    answer: 'Graduates have many career paths. They can become security analysts, penetration testers, or even CISOs. The field is wide open.',
    isOpen: false,
  }
  ,
  {
    question:'How can I enroll in the cyber security courses in Kochi?',
    answer: "To enroll, visit the Experts Skill Merge website or call their admissions team.They'll help with the application and answer any questions.",
    isOpen: false,
  }
];

  toggleAccordion(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;

    // Dynamically adjust maxHeight for expanded/collapsed items
    this.contents.forEach((content, i) => {
      const element = content.nativeElement as HTMLElement;
      if (i === index) {
        if (this.accordionItems[index].isOpen) {
          element.style.maxHeight = `${element.scrollHeight}px`; // Expand
        } else {
          element.style.maxHeight = '0'; // Collapse
        }
      } else {
        element.style.maxHeight = '0'; // Collapse all other items
      }
    });
  }
}
