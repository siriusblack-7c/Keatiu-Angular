import { Component } from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {StripeService} from "ngx-stripe";
import {HttpClient} from "@angular/common/http";
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";

@Component({
  selector: 'app-pre-register-successful',
  standalone: true,
    imports: [
        CurrencyPipe,
        FooterComponent,
        HeaderComponent,
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        NgForOf,
        TranslateModule,
        HeaderAuthenticatedComponent
    ],
  templateUrl: './pre-register-successful.component.html',
  styleUrl: './pre-register-successful.component.scss'
})
export class PreRegisterSuccessfulComponent {

  plans = [
    {
      slogan: "ONBOARDING_SUBSCRIBE_SLOGAN_BASIC",
      name: 'ONBOARDING_SUBSCRIBE_BASIC',
      advantages: [
        'ONBOARDING_SUBSCRIBE_A_COMPANY',
        // 'ONBOARDING_SUBSCRIBE_A_PROMOTION',
        'ONBOARDING_SUBSCRIBE_DAILY_CONTENT'
      ],
      price: 20
    }
  ];
  displayedText: string = '';
  currentMessage: string = 'ONBOARDING_WELCOME_SUBSCRIBE_MESSAGE';

  constructor(
    private stripe: StripeService,
    private httpClient: HttpClient,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('PRE_REGISTER_SUCCESSFUL_WELCOME').subscribe((res: string) => {
      this.typeWriterEffect(res);
    });
  }

  typeWriterEffect(text: string): void {
    this.displayedText = '';
    let i = 0;
    const speed = 25; // Velocidad en milisegundos

    const typeWriter = () => {
      if (i < text.length) {
        this.displayedText += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Asegúrate de que todo el texto se muestre al final
        this.displayedText = text;
        // Añadir la clase blink-caret al final del texto
        const textElement = document.getElementById('animated-text');
        if (textElement) {
          textElement.classList.add('blink-caret');
        }
      }
    };

    typeWriter();
  }

  subscribe(plan: any) {
    // Lógica para suscribirse a un plan específico
    console.log(`Subscribing to plan: ${plan.name}`);

    this.httpClient.get('/api/company').subscribe((response: any) => {
      if (response.length < 1) {
        document.location = '/onboarding-company';
      }

      this.httpClient.get('/api/promotion/company/' + response[0].uuid).subscribe((response: any) => {
        if (response.length < 1) {
          document.location = '/onboarding-promotion';
        }

        const promotion_uuid = response[0].uuid;

        this.stripe
          .redirectToCheckout({
            lineItems: [{ price: '@todo', quantity: 1 }],
            mode: 'subscription',
            successUrl: '@todo',
            cancelUrl: '@todo',
            clientReferenceId: promotion_uuid,
          })
          .subscribe(function (result) {
            console.log('result: ', result);
            alert(
              'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.'
            );
          });
      });
    });
  }

  payWithStripe() {
    this.subscribe(this.plans[0]);
  }

  payWithBankTransfer() {
    document.location.href = '/onboarding-subscribe-transfer';
  }
}
