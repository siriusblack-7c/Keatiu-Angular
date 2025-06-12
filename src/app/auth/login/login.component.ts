import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {catchError, throwError} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {HeaderComponent} from "../../website/home/header/header.component";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderAuthenticatedComponent} from "../../kreatiu/header-authenticated/header-authenticated.component";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        MatButton,
        MatInput,
        MatFormField,
        MatCardTitle,
        MatCardContent,
        MatCardHeader,
        MatCardModule,
        MatLabel,
        FormsModule,
        MatError,
        MatProgressSpinner,
        CommonModule,
        RouterLink,
        MatTooltip,
        MatAnchor,
        TranslateModule,
        HeaderComponent,
        FooterComponent,
        HeaderAuthenticatedComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('yoog_session')) {
      document.location.href = '/onboarding-subscribe';
    }
  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.error = '';
    this.loading = true;

    this.http.post('/api/user/session', loginData)
      .pipe(
        catchError((error) => {
          this.loading = false;
          this.error = 'LOGIN_INVALID_CREDENTIALS';
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        localStorage.setItem('yoog_session', response.session.uuid);
        this.loading = false;
        document.location.href = '/onboarding-company';
      });
  }

  protected readonly localStorage = localStorage;
}
