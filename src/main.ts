import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app-routing.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { provideRouter, withViewTransitions } from '@angular/router';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule),
        { provide: APP_BASE_HREF, useValue: '/movie-night' },
        provideAnimations(),
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
