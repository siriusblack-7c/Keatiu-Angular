import { Component } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";

@Component({
  selector: 'app-onboarding-subscribe-transfer',
  standalone: true,
    imports: [
        MatDivider,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatCardActions,
        MatButton,
        RouterLink,
        FooterComponent,
        HeaderComponent,
        HeaderAuthenticatedComponent
    ],
  templateUrl: './onboarding-subscribe-transfer.component.html',
  styleUrl: './onboarding-subscribe-transfer.component.scss'
})
export class OnboardingSubscribeTransferComponent {

}
