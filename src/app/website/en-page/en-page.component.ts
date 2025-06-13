import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { Meta, Title } from "@angular/platform-browser";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatAccordion } from '@angular/material/expansion';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-en-page',
  templateUrl: './en-page.component.html',
  styleUrls: ['./en-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    NgClass,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
    MatToolbar
  ]
})
export class EnPageComponent {
  isOnCTA = false;
  isNearBottom = false;
  isMenuOpen = false;
  isAtBottom = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setupSEO();
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
    this.titleService.setTitle('Kreatiu Influencers - Create AI-powered content for your social media');

    this.metaService.updateTag({
      name: 'description',
      content: 'Kreatiu Influencers lets you create high-quality content for your social media using artificial intelligence. Boost your productivity and grow your online presence with our tools designed for influencers.'
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: 'influencers, AI content, social media, kreatiu, kreatiu influencers'
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
    canonicalLink.setAttribute('href', 'https://kreatiu.cat/en');
    this.document.head.appendChild(canonicalLink);
  }
}
