import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-header-influencers',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    RouterLink,
    MatToolbar,
    MatAnchor,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './header-influencers.component.html',
  styleUrl: './header-influencers.component.scss'
})
export class HeaderInfluencersComponent {

  language = 'ca';
  navOpen = false;

  constructor(private translate: TranslateService, private titleService: Title) {
    this.language = localStorage.getItem('yoog_language') || 'ca';
  }

  getLinkUrl(link: string) {
    let languageUrl = this.language.replace('ca', '');

    if (languageUrl.length > 0) {
      languageUrl = `${languageUrl}/`;
    }

    return `/${languageUrl}${link}`;
  }

  changeLanguage() {
    const lang = this.language;
    this.translate.use(lang);
    localStorage.setItem('yoog_language', lang);
    this.updateTitleAndLangAttribute();
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  updateTitleAndLangAttribute() {
    this.translate.get('INDEX_SLOGAN').subscribe((slogan: string) => {
      this.titleService.setTitle(slogan);
    });

    document.documentElement.lang = localStorage.getItem('yoog_language') || 'ca';

    const language = localStorage.getItem('yoog_language') || 'ca';

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    url.pathname = `/${language.replace('ca', '')}`;
    window.history.pushState({}, '', url.toString());
  }
}
