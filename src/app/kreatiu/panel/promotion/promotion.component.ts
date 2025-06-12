import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {catchError, pipe} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatDivider,
    MatIconButton,
    MatButton,
    MatToolbar,
    NgIf,
    MatFormField,
    MatLabel,
    MatInput,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit {

  loading = false;
  editingField: any = '';
  promotion: any;
  promotion_uuid = '';
  fieldConfiguration: any = {
    title: {
      label: 'PANEL_PROMOTION_TITLE',
      type: 'text',
      maxLength: 100,
      minLength: 3,
      patchField: 'title'
    },
    target: {
      label: 'PANEL_PROMOTION_TARGET',
      type: 'text',
      maxLength: 100,
      minLength: 3,
      patchField: 'target'
    },
    about: {
      label: 'PANEL_PROMOTION_ABOUT',
      type: 'text',
      maxLength: 1000,
      minLength: 20,
      patchField: 'about'
    },
    communication_rules: {
      label: 'PANEL_PROMOTION_COMMUNICATION_RULES',
      type: 'text',
      maxLength: 1000,
      minLength: 3,
      patchField: 'communication_rules'
    },
    call_to_action: {
      label: 'PANEL_PROMOTION_CALL_TO_ACTION',
      type: 'text',
      maxLength: 100,
      minLength: 3,
      patchField: 'call_to_action'
    },
  }

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const promotion_uuid = params.get('promotion_uuid');
      if (promotion_uuid) {
        this.loadPromotion(promotion_uuid);
      }
    });
  }

  loadPromotion(promotion_uuid: string) {
    this.promotion_uuid = promotion_uuid;
    this.httpClient.get(`/api/promotion/${promotion_uuid}`)
      .pipe(
        catchError(error => {
          console.error(error);
          document.location = '/panel';
          return error;
        })
      )
      .subscribe((promotion: any) => {
        this.promotion = promotion;
      });
  }

  navigateToEdit(field: any) {
    this.editingField = field;
  }

  navigateToMainView() {
    this.editingField = '';
  }

  patchField(newValue: any) {
    this.loading = true;
    this.httpClient.patch(`/api/promotion/${this.promotion_uuid}`, {
      [this.fieldConfiguration[this.editingField].patchField]: newValue
    })
      .pipe(
        catchError(error => {
          console.error(error);
          this.loading = false;
          return error;
        })
      )
      .subscribe(() => {
        this.loading = false;
        this.editingField = '';
        this.loadPromotion(this.promotion_uuid);
        this.showSuccessMessage();
      });
  }

  showSuccessMessage(): void {
    this.snackBar.open('✅', '', {
      duration: 2000, // Duración de 2 segundos
      horizontalPosition: 'right', // Posición horizontal: 'start', 'center', 'end', 'left', 'right'
      verticalPosition: 'bottom' // Posición vertical: 'top' o 'bottom'
    });
  }
}
