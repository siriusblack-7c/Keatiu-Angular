import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {MatCardModule} from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {catchError, Observable} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";
import {CookieConsentComponent} from "./website/cookie-consent/cookie-consent.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    MatCardModule,
    CommonModule,
    CookieConsentComponent,
    // BrowserAnimationsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-panel';
  language = 'en';

  constructor(private translate: TranslateService, private http: HttpClient, private titleService: Title, private metaService: Meta) {
    this.initializeApp();
  }

  initializeApp() {
    this.loadLanguage(); /* @todo isolate this on a service */
  }

  loadLanguage() {
    const storedLang = localStorage.getItem('yoog_language');
    const urlLang = new URL(window.location.href).pathname.split('/')[1];
    if (['ca', 'es', 'en'].includes(urlLang)) {
      this.setLanguage(urlLang, 'url');
      return;
    }

    if (storedLang) {
      this.translate.use(storedLang);
      this.language = storedLang;
      return;
    }

    this.setLanguageBasedOnBrowser();
  }

  setLanguageBasedOnBrowser() {
    const browserLang = navigator.language;

    if (browserLang.startsWith('ca')) {
      this.setLanguage('ca', 'default browser');
      return;
    }

    if (browserLang.startsWith('es')) {
      this.setLanguage('es', 'default browser');
      return;
    }

    if (browserLang.startsWith('en')) {
      this.setLanguage('en', 'default browser');
      return;
    }

    this.setLanguage('en', 'default browser');
  }

  setLanguage(lang: string, origen: string = 'user') {
    localStorage.setItem('yoog_language', lang);
    this.translate.use(lang);
    this.language = lang;
  }
}
