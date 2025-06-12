import { Component } from '@angular/core';
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";

@Component({
  selector: 'app-onboarding-welcome',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatStep,
    MatCard,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf,
    ReactiveFormsModule,
    TranslateModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatDivider,
    MatIcon,
    HeaderAuthenticatedComponent
  ],
  templateUrl: './onboarding-welcome.component.html',
  styleUrl: './onboarding-welcome.component.scss'
})
export class OnboardingWelcomeComponent {

  constructor(private router: Router) {
  }

  goToPanel() {
    this.router.navigate(['/panel']);
  }

  startInterview() {
    this.router.navigate(['/onboarding-company']);
  }
}
