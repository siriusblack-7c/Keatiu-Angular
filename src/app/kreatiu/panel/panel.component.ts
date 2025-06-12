import {Component, OnInit} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatLine} from "@angular/material/core";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {StripeService} from "ngx-stripe";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatMenu, MatMenuItem} from "@angular/material/menu";

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatIcon,
    MatSidenav,
    MatToolbar,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatExpansionPanelHeader,
    MatSidenavContent,
    MatIconButton,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatGridTile,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatList,
    MatDivider,
    MatLine,
    FooterComponent,
    TranslateModule,
    RouterLink,
    MatMenu,
    MatMenuItem,
    RouterOutlet
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private stripe: StripeService,
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
    private translateService: TranslateService
  ) {}

  requestCloseSession() {
    this.translateService.get('PANEL_CLOSE_SESSION_QUESTION').subscribe((message: string) => {
      if (confirm(message)) {
        localStorage.removeItem('yoog_session');
        localStorage.removeItem('yoog_language');
        // @todo http request to remove the session
        document.location = '/login';
      }
    });
  }
}
