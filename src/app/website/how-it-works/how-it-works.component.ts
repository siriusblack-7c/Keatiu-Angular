import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../home/footer/footer.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatAnchor} from "@angular/material/button";
import {HeaderComponent} from "../home/header/header.component";

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    RouterLink,
    FooterComponent,
    MatCardContent,
    MatAnchor,
    MatCard,
    HeaderComponent
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements OnInit {
  language = 'ca';

  ngOnInit(): void {
    this.language = localStorage.getItem('yoog_language') || 'ca';
  }

}
