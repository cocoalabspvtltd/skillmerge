
import { ActivatedRoute, Router , RouterModule} from '@angular/router';
import { Component, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogserviceService } from '../../services//blogservice.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  blogId: string | null = null;
  blogDetails: any = {};
  baseurl: any
  loaderStatus:any
  loader: any
  data1: any;
  newsData: any;
  sanitizedDescription:any
  blogTitle: any

  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer,@Inject(DOCUMENT) private document: Document,private Apiservice:ApiService, private blogDataService: BlogserviceService , private router: Router,private fb: FormBuilder) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      const refresh = localStorage.getItem('refreshval1');      
      // console.log('counter',refresh);
      localStorage.setItem('refreshval1','false');
      if (refresh=='false') {
         localStorage.setItem('refreshval1','true');
         window.location.reload();     
      }
    
    this.baseurl='https://skillmerge.in/backend/storage/app/public/'
  }
}

  ngOnInit(): void {
    // Get the route parameter
  //   this.blogId = this.blogDataService.getBlogId();
  //  const encodedTitle = this.route.snapshot.paramMap.get('title');
  // const blogTitle = decodeURIComponent(encodedTitle || '');  // URL decode the title
  // console.log('Blog Title:', blogTitle);
  //   console.log('Blog ID:', this.blogId);
  //   console.log('Blog Title:', this.blogTitle);
  this.blogId = sessionStorage.getItem('blogId');
   console.log('Blog ID:', this.blogId);
    this.loaderStatus=false;
    this.blog();
    
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

blog(){
  this.Apiservice.blogdetails(this.blogId).subscribe(
    (res:any) => {        
      if(res.success==true){ 
        console.log(res)
        // this.loaderStatus=true;       
        //  this.baseurl='https://skillmerge.in/backend/storage/app/public'
         this.data1= res.data;
        // this.newsData = res.data.slice(-2);
       // console.log(this.newsData)  
       this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.data1.description);     
      }
      else{
        this.loaderStatus=false;
      }
    })

}
sanitizeHtml(content: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(content);
}
}
