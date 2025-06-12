import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
