import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HackverseComponent } from './pages/hackverse/hackverse.component';
import { AIComponent } from './pages/ai/ai.component';
import { metaGuard } from './guards/meta.guard';
import { WebdevelopmentComponent } from './pages/webdevelopment/webdevelopment.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent,canActivate: [metaGuard], data: { title: 'Ethical Hacker Training and Internships in Kochi', description: 'Join our Ethical Hacker Training and internships in Kochi. Hire to train with experts and start your cybersecurity career today! Limited seats available.' } }, // Root path loads HomeComponent
    { path: 'contact', component: ContactComponent ,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' }},
    { path: 'about', component: AboutComponent,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'cybersecurity', component: ProgramsComponent ,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'artificialintelligence', component: AIComponent,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' }  },
    { path: 'blog', component: BlogComponent ,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'webdevelopment', component:  WebdevelopmentComponent  ,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'apply', component: ApplyComponent ,canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'hackverse', component: HackverseComponent, canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } },
    { path: 'blog/:title', component: BlogDetailsComponent, canActivate: [metaGuard], data: { title: 'Skillmerge', description: '' } }
    // { path: '**', component: ErrorPageComponent } // Fallback to ErrorPageComponent for unknown routes
];
