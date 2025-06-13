import {Component, HostListener, Inject} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {DOCUMENT, NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cat-page',
  standalone: true,
  imports: [
    MatAccordion,
    MatAnchor,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatToolbar,
    MatTooltip,
    NgIf,
    RouterLink,
    TranslateModule,
    NgClass
  ],
  templateUrl: './cat-page.component.html',
  styleUrl: './cat-page.component.scss'
})
export class CatPageComponent {

  isNearBottom = false;
  isOnCTA = false;
  isMenuOpen = false;
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setupSEO();
    document.cookie = 'lang=cat; path=/; max-age=31536000';
  }

  @HostListener('window:scroll', [])
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    this.isNearBottom = scrollTop + windowHeight >= fullHeight - 300;
  }

  scrollDown(): void {
    if (this.isNearBottom) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      window.scrollBy({top: window.innerHeight, behavior: 'smooth'});
    }
  }

  startWithGoogle() {
    window.location.href = '/influencers-api/login';
  }

  scrollToHowItWorks() {
    const el = document.getElementById('how-it-works');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  setupSEO() {
    this.titleService.setTitle('Kreatiu Influencers - Crea contingut amb IA per a les teves xarxes socials');

    this.metaService.updateTag({
      name: 'description',
      content: 'Kreatiu Influencers et permet crear contingut de qualitat per a les teves xarxes socials utilitzant intel·ligència artificial. Augmenta la teva productivitat i millora la teva presència en línia amb les nostres eines dissenyades per a influencers.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'influencers, contingut IA, xarxes socials, kreatiu, kreatiu influencers'
    });

    const existingHreflangs = this.document.querySelectorAll('link[rel="alternate"]');
    existingHreflangs.forEach(el => el.remove());

    const hreflangs = [
      {lang: 'es', href: 'https://kreatiu.cat/es'},
      {lang: 'ca', href: 'https://kreatiu.cat/cat'},
      {lang: 'en', href: 'https://kreatiu.cat/en'},
      {lang: 'x-default', href: 'https://kreatiu.cat'}
    ];

    hreflangs.forEach(({lang, href}) => {
      const linkEl = this.document.createElement('link');
      linkEl.setAttribute('rel', 'alternate');
      linkEl.setAttribute('hreflang', lang);
      linkEl.setAttribute('href', href);
      this.document.head.appendChild(linkEl);
    });

    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    const canonicalLink = this.document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://kreatiu.cat/cat');
    this.document.head.appendChild(canonicalLink);
  }

}
