import { Component, Inject, AfterViewInit,ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin } from 'rxjs';
import AOS from 'aos';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
declare var bootstrap: any;



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, ReactiveFormsModule, CarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loaderStatus = true;
  sliderData: any;
  whatwe_Data: any;
  programData: any;
  baseurl: any;
  whyData: any;
  bg: any;
  approchData: any;
  approach_bg: any;
  selectionData: any;
  newsData: any;
  teamData: any;
  parent_companies: any;
  achievements: any;
  pdata: any;
  testData: any;
  faqData: any;
  hackData: any;
  jobData: any;
  baseurl1: any;
  showContent = false;
  errorMsg: any;
  msg: any;
  loader:any
  @ViewChild('myModal', { static: false }) myModal!: ElementRef;
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
  });
  data1: any;
  isModalVisible = false;
  renderer: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initLocalStorageRefresh();
  }

  ngOnInit(): void { 
    this.openModal();
    this.loadData(); 
  
  }
 
  initLocalStorageRefresh(): void {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const refresh = localStorage.getItem('refreshval1');
      if (!refresh) {
        localStorage.setItem('refreshval1', 'true');
        window.location.reload();
      } else {
        localStorage.removeItem('refreshval1');
      }
    }
  }

  loadData() {
    forkJoin({
      slider: this.apiService.slider(),
      whatWe: this.apiService.whatWe(),
      programs: this.apiService.programs(),
      whyChoose: this.apiService.why_choose(),
      approach: this.apiService.approach(),
      selection: this.apiService.selection(),
      news: this.apiService.news(),
      teams: this.apiService.team(),
      testimonials: this.apiService.testimonial(),
      faq: this.apiService.faq(),
      hackverse: this.apiService.hackverse(),
      job: this.apiService.job()
    }).subscribe({
      next: (res) => {
        if (res.slider?.success) this.sliderData = res.slider.data;
        this.baseurl1=res.slider.base_url;
        
        if (res.whatWe?.success) this.whatwe_Data = res.whatWe.data;
        if (res.programs?.success) this.programData = res.programs.data.
        programs[0].course_programs.slice(-6);
        console.log(res.programs.data)
        if (res.whyChoose?.success) this.whyData = res.whyChoose.data;
        if (res.approach?.success) this.approchData = res.approach.data;
       
        this.approach_bg=res.approach.bg_image;  
        if (res.selection?.success) this.selectionData = res.selection.data;
        if (res.news?.success) this.newsData = res.news.data.slice(-2);
        this.data1= res.news.data[0];      
        if (res.teams?.success) this.teamData = res.teams.teams_details[0];
        if (res.testimonials?.success) this.testData = res.testimonials.data;
        if (res.faq?.success) this.faqData = res.faq.data;
        if (res.hackverse?.success) this.hackData = res.hackverse.data;
        if (res.job?.success) this.jobData = res.job.data.slice(-6);

        this.loaderStatus = false; // Hide loader after all data is loaded
   
      },
      error: (err) => {
        this.loaderStatus = false; // Hide loader on error
        console.error("Error loading data", err);
       
      }
    });
  }
  // Function to show modal
  openModal() {
    this.isModalVisible = true;
  }

  // Function to close modal
  closeModal() {
    this.isModalVisible = false;
  }
  closeModal1(): void {
    console.log('sdfsdf')
    $('#myModal1').modal('hide'); // Close the modal without using setStyle
  }
  toggleContent() {
    this.showContent = !this.showContent;
  }

  contact() {
    console.log(this.contactForm.value)
    if (this.contactForm.invalid) {
     this.toastr.error("Please fill in all required fields correctly.", "Error");
     return;
   }
 
   const data = {
     name: this.contactForm.value.name,
     email: this.contactForm.value.email,
     phone_number: this.contactForm.value.phone,
     course: this.contactForm.value.course,
     mode:this.contactForm.value.mode,
   };
 
   this.apiService.register(data).subscribe(
     (res: any) => {
      // console.log('fjbhj')
       if (res.success) {
         this.toastr.success(res.message, "Success");
         this.contactForm.reset();
         this.closeModal1();
       } else {
         this.toastr.error(res.message, "Error");
       }
     },
     (error: any) => {
             this.toastr.error("An error occurred. Please try again.", "Error");
     }
   );
 }
 

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 2 },
      940: { items: 2 }
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };
  customOptions1: OwlOptions = {
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
        items: 1
      },
      940: {
        items: 1
      }
    },
    autoplay: true,             // Enable automatic sliding
    autoplayTimeout: 3000,      // Set the time interval for the slides (3 seconds in this case)
    autoplayHoverPause: true    // Pause autoplay on hover
  };
 closeModal2(){
  const modal = document.getElementById('myModal1');
  if (modal) {
    // Manually trigger modal hide
    $(modal).modal('hide');
  }
 }
 closeModal11(){
  console.log('Close Modal triggered');
  const modalElement = document.getElementById('myModal');
  if (modalElement) {
    console.log('Modal element found!');
    const modal = new bootstrap.Modal(modalElement);
    modal.hide();
  } else {
    console.log('Modal not found!');
  }
}
}
