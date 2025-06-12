import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {RouterLink} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {StripeService} from "ngx-stripe";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgIf,
    NgForOf,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    RouterLink,
    MatAccordion,
    TranslateModule
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  companies = null;
  promotionsByCompany: any = {};

  constructor(
    private stripe: StripeService,
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
    private translateService: TranslateService
  ) {}


  ngOnInit() {
    this.httpClient.get('/api/company').subscribe((companies: any) => {
      this.companies = companies;
      console.log(this.companies);
      for (let company of companies) {
        this.fetchPromotionsByCompany(company.uuid);
      }
    });
  }

  fetchPromotionsByCompany(companyUuid: string) {
    this.httpClient.get('/api/promotion/company/' + companyUuid).subscribe((promotions: any) => {
      this.promotionsByCompany[companyUuid] = promotions;
      console.log(this.promotionsByCompany[companyUuid])
    });
  }

  pay(promotionUuid: string) {
    document.location = '/onboarding-subscribe/' + promotionUuid;
  }

}
