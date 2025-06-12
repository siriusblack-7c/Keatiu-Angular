import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf, CurrencyPipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FooterComponent} from '../../website/home/footer/footer.component';
import {HeaderComponent} from '../../website/home/header/header.component';
import {StripeService} from 'ngx-stripe';
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";

@Component({
  selector: 'app-onboarding-suscribe',
  standalone: true,
  imports: [
    MatButton,
    TranslateModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgForOf,
    CurrencyPipe,
    MatCardActions,
    MatCardTitle,
    RouterLink,
    FooterComponent,
    HeaderComponent,
    HeaderAuthenticatedComponent
  ],
  templateUrl: './onboarding-suscribe.component.html',
  styleUrls: ['./onboarding-suscribe.component.scss']
})
export class OnboardingSuscribeComponent implements OnInit {
  plans = [
    {
      slogan: "ONBOARDING_SUBSCRIBE_SLOGAN_BASIC",
      name: 'ONBOARDING_SUBSCRIBE_MONTHLY',
      advantages: [
        'ONBOARDING_SUBSCRIBE_A_COMPANY',
        'ONBOARDING_SUBSCRIBE_DAILY_CONTENT'
      ],
      price: 20,
      priceCode: 'price_1PoKTSHxy6ohSLD1QvQKMkbn'
    },
    {
      slogan: "ONBOARDING_SUBSCRIBE_SLOGAN_BASIC",
      name: 'ONBOARDING_SUBSCRIBE_YEARLY',
      advantages: [
        'ONBOARDING_SUBSCRIBE_TWO_FREE_MONTHS',
        'ONBOARDING_SUBSCRIBE_DAILY_CONTENT'
      ],
      price: 16.67,
      priceCode: 'price_1PoKZ4Hxy6ohSLD1mAh4JzLg'
    }
  ];
  displayedText: string = '';
  currentMessage: string = 'ONBOARDING_WELCOME_SUBSCRIBE_MESSAGE';
  promotion_uuid: any = '';

  constructor(
    private stripe: StripeService,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.translate.get('ONBOARDING_WELCOME_SUBSCRIBE_MESSAGE').subscribe((res: string) => {
      this.typeWriterEffect(res);
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('promotion_uuid')) {
        this.promotion_uuid = params.get('promotion_uuid');
      } else {
        this.httpClient.get('/api/company').subscribe((response: any) => {
          if (response.length < 1) {
            document.location = '/onboarding-company';
          }

          if (response.length > 1) {
            document.location = '/panel';
          }

          this.httpClient.get('/api/promotion/company/' + response[0].uuid).subscribe((response: any) => {
            if (response.length < 1) {
              document.location = '/onboarding-promotion';
            }

            if (response.length > 1) {
              document.location = '/panel';
            }

            this.promotion_uuid = response[0].uuid;

            if (response[0].active) {
              document.location = '/panel';
            }
          });
        });
      }
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

  subscribe(price: string) {
    if (this.promotion_uuid !== null) {
      this.stripe
        .redirectToCheckout({
          lineItems: [{price: price, quantity: 1}],
          mode: 'subscription',
          successUrl: 'https://kreatiu.cat/panel',
          cancelUrl: 'https://kreatiu.cat/panel',
          clientReferenceId: this.promotion_uuid,
        })
        .subscribe(function (result) {
          console.log('result: ', result);
          alert(
            'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.'
          );
        });

      return;
    }

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
            lineItems: [{price: price, quantity: 1}],
            mode: 'subscription',
            successUrl: 'https://kreatiu.cat/panel',
            cancelUrl: 'https://kreatiu.cat/panel',
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

  pay(price: string) {
    this.subscribe(price);
  }
}
