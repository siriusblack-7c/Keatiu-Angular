import {Component, HostListener} from '@angular/core';
import {HeaderInfluencersComponent} from "./header-influencers/header-influencers.component";
import {FooterComponent} from "../home/footer/footer.component";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-home-influencers',
  standalone: true,
  imports: [
    HeaderInfluencersComponent,
    FooterComponent,
    MatIcon,
    MatCard,
    MatCardContent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    NgClass,
    NgIf
  ],
  templateUrl: './home-influencers.component.html',
  styleUrl: './home-influencers.component.scss'
})
export class HomeInfluencersComponent {
  isNearBottom = false;
  isOnCTA = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // const distanceFromBottom = fullHeight - (scrollTop + windowHeight);

    this.isNearBottom = scrollTop + windowHeight >= fullHeight - 300;
    // this.isOnCTA = distanceFromBottom >= 100 && distanceFromBottom <= 105;
    // console.log('scrolltop', scrollTop);
    // console.log('windowHeight', windowHeight);
    // console.log('fullHeight', fullHeight);
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
}
