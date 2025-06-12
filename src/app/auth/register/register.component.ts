import {Component, OnInit, Renderer2} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {MatCheckbox} from "@angular/material/checkbox";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltip} from "@angular/material/tooltip";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {HeaderAuthenticatedComponent} from "../../kreatiu/header-authenticated/header-authenticated.component";

declare let window: any;

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        MatButton,
        MatInput,
        MatFormField,
        MatCardHeader,
        MatCardContent,
        MatCardModule,
        MatLabel,
        MatError,
        NgIf,
        FormsModule,
        MatAnchor,
        MatCheckbox,
        TranslateModule,
        MatTooltip,
        FooterComponent,
        HeaderComponent,
        HeaderAuthenticatedComponent
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  error = '';
  loading = false;

  email = '';

  constructor(private http: HttpClient, private renderer: Renderer2) {
  }

  async register() {
    this.loading = true;
    this.error = '';
    const recaptchaToken = await this.handleRecaptcha();
    if (!recaptchaToken && 'localhost' !== window.location.hostname) {
      this.error =
        'Error al validar el reCAPTCHA. Por favor, inténtalo de nuevo.';
      return;
    }

    this.http.post('/api/user', {
      email: this.email,
      captcha: recaptchaToken
    }).pipe(
      catchError((error) => {
        this.error = 'Los datos ingresados son incorrectos. Por favor, inténtalo de nuevo.' // @todo add translations
        this.loading = false;
        return throwError(error);
      })
    ).subscribe(
      (response: any) => {
        if (response['error']) {
          this.error = response['error'];
        } else {
          localStorage.setItem('yoog_session', response['session']['uuid']);

          window.location.href = '/onboarding-welcome';
        }
        this.loading = false;
      }
    );
  }

  async handleRecaptcha() {
    return new Promise<string>(resolve => {
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        window.grecaptcha.enterprise.ready(async () => {
          const token = await window.grecaptcha.enterprise.execute(
            '6LfuQPopAAAAAAQb3SDiy7DmphYHgpqYiAhHQuyK',
            {action: 'REGISTER'}
          );
          resolve(token);
        });
      } else {
        resolve('');
      }
    });
  }

  ngOnInit(): void {
    this.loadRecaptchaScript();
  }

  loadRecaptchaScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LfuQPopAAAAAAQb3SDiy7DmphYHgpqYiAhHQuyK';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
}
