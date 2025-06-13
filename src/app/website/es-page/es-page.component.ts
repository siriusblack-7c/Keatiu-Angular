import { Component, HostListener, Inject } from '@angular/core';
import { FooterComponent } from "../home/footer/footer.component";
import { HeaderInfluencersComponent } from "../home-influencers/header-influencers/header-influencers.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { DOCUMENT, NgClass, NgIf } from "@angular/common";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-es-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderInfluencersComponent,
    MatAccordion,
    MatCard,
    MatCardContent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NgIf,
    NgClass,
    MatAnchor,
    MatButton,
    MatToolbar,
    RouterLink,
    TranslateModule,
    MatTooltip,
    MatIcon,
    MatGridTile,
    MatGridList,
    MatCardTitle,
    MatCardHeader
  ],
  templateUrl: './es-page.component.html',
  styleUrl: './es-page.component.scss'
})
export class EsPageComponent {

  isNearBottom = false;
  isOnCTA = false;
  isMenuOpen = false;
  isAtBottom = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setupSEO()
    document.cookie = 'lang=es; path=/; max-age=31536000';
  }

  @HostListener('window:scroll', [])
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('show');
    }
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

  scrollDown(): void {
    if (this.isNearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
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
    this.titleService.setTitle('Kreatiu Influencers - Crea contenido con IA para tus redes sociales');

    this.metaService.updateTag({
      name: 'description',
      content: 'Kreatiu Influencers te permite crear contenido de calidad para tus redes sociales utilizando inteligencia artificial. Aumenta tu productividad y mejora tu presencia online con nuestras herramientas diseñadas para influencers.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'influencers, contenido IA, redes sociales, kreatiu, kreatiu influencers'
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
    canonicalLink.setAttribute('href', 'https://kreatiu.cat/es');
    this.document.head.appendChild(canonicalLink);
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
}
