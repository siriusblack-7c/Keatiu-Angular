import { Component, HostListener, Inject } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { DOCUMENT, NgClass, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { Meta, Title } from "@angular/platform-browser";

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
  isAtBottom = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setupSEO();
    document.cookie = 'lang=cat; path=/; max-age=31536000';
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if at bottom (within 50px)
    this.isAtBottom = scrollTop + windowHeight >= documentHeight - 50;

    // Existing logic
    this.isNearBottom = scrollTop + windowHeight > documentHeight * 0.8;
    this.isOnCTA = scrollTop > 100;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('show');
    }
  }

  handleScrollClick() {
    if (this.isAtBottom) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll down by viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  }

  startWithGoogle() {
    window.location.href = '/influencers-api/login';
  }

  scrollToHowItWorks() {
    const el = document.getElementById('how-it-works');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  setupSEO() {
    this.titleService.setTitle('Kreatiu Influencers - Crea contingut amb IA per a les teves xarxes socials');

    this.metaService.updateTag({
      name: 'description',
      content: 'Kreatiu Influencers et permet crear contingut de qualitat per a les teves xarxes socials utilizando intel·ligència artificial. Augmenta la teva productivitat i millora la teva presència en línia amb les nostres eines dissenyades per a influencers.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'influencers, contingut IA, xarxes socials, kreatiu, kreatiu influencers'
    });

    const existingHreflangs = this.document.querySelectorAll('link[rel="alternate"]');
    existingHreflangs.forEach(el => el.remove());

    const hreflangs = [
      { lang: 'es', href: 'https://kreatiu.cat/es' },
      { lang: 'ca', href: 'https://kreatiu.cat/cat' },
      { lang: 'en', href: 'https://kreatiu.cat/en' },
      { lang: 'x-default', href: 'https://kreatiu.cat' }
    ];

    hreflangs.forEach(({ lang, href }) => {
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
