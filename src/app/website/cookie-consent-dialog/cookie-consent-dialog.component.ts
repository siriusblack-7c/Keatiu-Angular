import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-cookie-consent-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatCardTitle,
    MatCardContent,
    MatCard
  ],
  templateUrl: './cookie-consent-dialog.component.html',
  styleUrl: './cookie-consent-dialog.component.scss'
})
export class CookieConsentDialogComponent {

  constructor(public dialogRef: MatDialogRef<CookieConsentDialogComponent>) {}

  acceptCookies(): void {
    window.scrollTo(0, 0);
    this.dialogRef.close('accepted');
  }

  rejectCookies(): void {
    window.scrollTo(0, 0);
    this.dialogRef.close('rejected');
  }

  moreInfo(): void {
    window.location.href = '/legal/cookies';
  }
}
