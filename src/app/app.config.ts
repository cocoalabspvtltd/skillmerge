import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApiService } from './services/api.service';
// import { tokenInterceptor } from './services/token.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    provideClientHydration(), // required animations providers
    importProvidersFrom(ToastrModule.forRoot({positionClass: 'toast-top-right'})),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass:PathLocationStrategy }, provideAnimationsAsync() // Use PathLocationStrategy here
  ]
}  

