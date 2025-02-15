import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
var loginToken = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({
       Authorization: 'Bearer ' + loginToken,
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL = 'https://www.skillmerge.in/backend';
private getHeaders() {
 const headers = new HttpHeaders({
   'ngrok-skip-browser-warning':  '69420',
   'Content-Type':'appilcation/json'
 });
 return {headers};
}
constructor(private http: HttpClient) {}
//=================================slider===========================================================//
public slider():Observable<any>{
  //console.log('stream',data);
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/home-slider`,httpOptions)
 }
 
//=================================about===========================================================//
public about():Observable<any>{
  //console.log('stream',data);
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/about-us`,httpOptions)
 }
 //================================= what-we-do===========================================================//
public whatWe():Observable<any>{
  //console.log('stream',data);
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/what-we-do`,httpOptions)
 }
 //================================= team===========================================================//
 public team():Observable<any>{
  //console.log('stream',data);
  const headers = new HttpHeaders();
    return this.http.get<any>(this.BASE_URL + `/api/our-teams`,httpOptions)
 }
  //================================= programs===========================================================//
  // public programs():Observable<any>{
  //   //console.log('stream',data);
  //   const headers = new HttpHeaders();
  //     return this.http.get<any>(this.BASE_URL + `/api/programs`,httpOptions)
  //  }
   
   //================================= Why chooseus===========================================================//
  public why_choose():Observable<any>{
    //console.log('stream',data);
    const headers = new HttpHeaders();
      return this.http.get<any>(this.BASE_URL + `/api/why-choose-us`,httpOptions)
   }
       //================================= Why chooseus===========================================================//
  public approach():Observable<any>{
    //console.log('stream',data);
    const headers = new HttpHeaders();
      return this.http.get<any>(this.BASE_URL + `/api/our-aaproachs`,httpOptions)
   }

//================================= selection-process===========================================================//
  public  selection():Observable<any>{
    //console.log('stream',data);
    const headers = new HttpHeaders();
      return this.http.get<any>(this.BASE_URL + `/api/selection-process`,httpOptions)
   }
//================================= selection-process===========================================================//
public register(data:any):Observable<any>{
 //console.log('stream',data);
const headers = new HttpHeaders();
  return this.http.post<any>(this.BASE_URL + `/api/student-registration`,data,httpOptions)
     }

//================================= news-and-blogs===========================================================//
public news():Observable<any>{
  //console.log('stream',data);
 const headers = new HttpHeaders();
   return this.http.get<any>(this.BASE_URL + `/api/news-and-blogs`,httpOptions)
      }
     
//================================= testimonial===========================================================//
public testimonial():Observable<any>{
  //console.log('stream',data);
 const headers = new HttpHeaders();
   return this.http.get<any>(this.BASE_URL + `/api/testimonials`,httpOptions)
      }
 //================================= faq===========================================================//
public faq():Observable<any>{
  //console.log('stream',data);
 const headers = new HttpHeaders();
   return this.http.get<any>(this.BASE_URL + `/api/faq`,httpOptions)
      }
   //=================================hackverse===========================================================//
public hackverse():Observable<any>{
const headers = new HttpHeaders();
return this.http.get<any>(this.BASE_URL + `/api/hackverse`,httpOptions)
}
 //========================================================================
    //================================cyber==========================================================//
public programs():Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/programs`,httpOptions)
  }    
      //================================job==========================================================//
public job():Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/latest-jobs`,httpOptions)
  } 
    //================================aminities==========================================================//
public aminiti():Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/aminities`,httpOptions)
  } 
      //================================aminities==========================================================//
public certifications():Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/global-certification-partners`,httpOptions)
  }
        //================================aminities==========================================================//
public placements():Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/placement-drives`,httpOptions)
  }
 //================================contact=========================================================//
public contact(data:any):Observable<any>{
  const headers = new HttpHeaders();
  return this.http.post<any>(this.BASE_URL + `/api/contact`,data,httpOptions)
  }

 //================================contact=========================================================//
 public blogdetails(id:any):Observable<any>{
  const headers = new HttpHeaders();
  return this.http.get<any>(this.BASE_URL + `/api/blog-view/`+id,httpOptions)
  }



 




}


