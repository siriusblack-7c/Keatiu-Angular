import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from "@angular/common/http";
import {SessionInterceptorService} from "./auth/services/session-interceptor.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LanguageInterceptorService} from "./website/services/language-interceptor.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideNativeDateAdapter} from "@angular/material/core";

export function HttpLoaderFactory(http: HttpClient) {
  const version = "1.0.1";
  return new TranslateHttpLoader(http, `/assets/i18n/`, `.json?v=${version}`);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    importProvidersFrom(
      NgxStripeModule.forRoot("pk_live_51Pmf1lHxy6ohSLD1hZ7W4INkMVf6mNDWVuFlaNKoPjVkDRCLDXWxJkedVmsfVZPzyMAxQXNBJIpQMxIb9tc6dSH600SzYCFIzl")
    ),
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptorService, multi: true}
  ]
};
