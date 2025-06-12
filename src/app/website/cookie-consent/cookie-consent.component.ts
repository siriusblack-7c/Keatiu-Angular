import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CookieConsentDialogComponent} from "../cookie-consent-dialog/cookie-consent-dialog.component";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent {

  consentStatus: string | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.consentStatus = localStorage.getItem('cookie_consent');

    if (!this.consentStatus || (this.consentStatus !== 'accepted' && this.consentStatus !== 'rejected')) {
      localStorage.removeItem('cookie_consent');
      this.openConsentDialog();
    }
  }

  openConsentDialog(): void {
    const dialogRef = this.dialog.open(CookieConsentDialogComponent, {
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accepted') {
        localStorage.setItem('cookie_consent', 'accepted');
        this.loadNonEssentialCookies();
      } else if (result === 'rejected') {
        localStorage.setItem('cookie_consent', 'rejected');
      }
    });
  }

  loadNonEssentialCookies(): void {
    // Cargar cookies no técnicas aquí
  }

  openConsentDialogAgain(): void {
    this.openConsentDialog();
  }
}
