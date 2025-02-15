import { Component, HostListener, Inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogserviceService } from '../../services//blogservice.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  loader: any;
  loaderStatus: any;
  newsData: any[] = []; // Array to store fetched data
  paginatedData: any[] = []; // Array to store current page data
  baseurl: string = 'https://skillmerge.in/backend/storage/app/public/';
  currentPage = 1; // Current page number
  itemsPerPage = 5; // Number of items per page

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private Apiservice: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title,
    private blogDataService:BlogserviceService,
  ) {}

  ngOnInit(): void {
    this.loaderStatus = false;
    this.blog(); // Fetch blogs
    this.check(); // Simulated loader check
  }

  // Fetch blogs from the API
  blog(): void {
    this.loaderStatus = true;
    this.Apiservice.news().subscribe(
      (res: any) => {
        if (res.success === true) {
          this.loaderStatus = true;
          this.newsData = res.data; // Store the fetched data
          this.updatePaginatedData(); // Update paginatedData after fetching data
        } else {
          this.loaderStatus = false;
        }
      },
      (error) => {
        console.error('Error fetching news data:', error);
      }
    );
  }

  // Navigate to blog details
  view(item: any): void {
  console.log(item.title);
  // const titleBeforeColon = item.title.split(':')[0];
  // const encodedTitle = encodeURIComponent(titleBeforeColon );
  sessionStorage.setItem('blogId', item.id);
  const sanitizedTitle = item.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  this.router.navigate(['/blog',sanitizedTitle ]);
  }

  // Updates paginatedData based on currentPage and itemsPerPage
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.newsData.slice(startIndex, endIndex);
  }

  // Handles page navigation
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Calculates total pages
  get totalPages(): number[] {
    const pages = Math.ceil(this.newsData.length / this.itemsPerPage);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  // Simulates loader behavior
  check(): void {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }
}