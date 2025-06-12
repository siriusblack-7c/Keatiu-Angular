import {Component, OnInit} from '@angular/core';
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "./footer/footer.component";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatAnchor,
    MatToolbar,
    MatButton,
    MatIcon,
    TranslateModule,
    FormsModule,
    FooterComponent,
    RouterLink,
    HeaderComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  language = 'ca';

  constructor() {
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('yoog_language') || 'ca';
  }

}
