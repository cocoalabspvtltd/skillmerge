import { Component, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,CommonModule ,CarouselModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  loader: any;
  sliderData: any;
  sliderImage: any;
  loaderStatus:any;
  aboutData: any;
  aboutImage: any;
  showCheckIcon: boolean = true; 
  teamData: any;
  achievements: any;
  parent_companies: any;
  baseurl: string;
  testData: any;
  faqData: any;
  constructor(@Inject(DOCUMENT) private document: Document,private Apiservice:ApiService,private router: Router,private fb: FormBuilder){
 
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
    this.baseurl='https://www.skillmerge.in/test/skill-merge-live/storage/app/public'
  }
  ngOnInit(): void {   
    this.loaderStatus=false;
    this.about();
    this.teams();
    this.faq();    
    this.testimonial();  
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
  
about(){
  this.Apiservice.about().subscribe(
    (res:any) => { 
      
      if(res.success==true){ 
        this.loaderStatus=true;
        this.aboutData=res.data[0];
        this.aboutImage=res.bg_image;
        console.log( this.aboutImage)
      }
      else{
        this.loaderStatus=false;
      }
    })
}
teams(){
  this.Apiservice.team().subscribe(
    (res:any) => {  
                if(res.success==true){       
              this.loaderStatus=true;
              this.teamData=res.teams_details[0];              
                // Parse the achievements string
                this.achievements = JSON.parse(this.teamData.achievements);
                this.parent_companies=JSON.parse(this.teamData.parent_companies);
      }
      else{
        this.loaderStatus=false;
      }
    })
}
testimonial(){
  this.Apiservice.testimonial().subscribe(
    (res:any) => {  
    console.log('program',res)   
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

}