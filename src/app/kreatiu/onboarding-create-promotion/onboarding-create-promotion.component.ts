import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatError, MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatChip, MatChipInput} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-onboarding-create-promotion',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext,
    MatStepperPrevious,
    MatFormField,
    MatLabel,
    NgIf,
    MatError,
    MatHint,
    NgStyle,
    MatChip,
    MatIcon,
    MatChipInput,
    MatSelect,
    MatOption,
    NgForOf,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    TranslateModule,
    FooterComponent,
    HeaderComponent,
    MatCard,
    MatCardActions,
    MatFormFieldModule,
    MatInputModule,
    HeaderAuthenticatedComponent
  ],
  templateUrl: './onboarding-create-promotion.component.html',
  styleUrls: ['./onboarding-create-promotion.component.scss']
})
export class OnboardingCreatePromotionComponent implements OnInit {
  promotionTitleFormGroup!: FormGroup;
  promotionDescriptionFormGroup!: FormGroup;
  promotionTargetFormGroup!: FormGroup;
  promotionCommunicationRulesFormGroup!: FormGroup;
  ctaFormGroup!: FormGroup;
  platformFormGroup!: FormGroup;
  error: string = '';
  currentMessage: string = 'ONBOARDING_WELCOME_PROMOTION_TITLE_MESSAGE';
  displayedText: string = '';

  languages = [
    { display: "Català", value: "ca" },
    { display: 'Español', value: 'es' },
    { display: 'English', value: 'en' }
  ];

  actionTypes = [
    { index: 0, display: 'ONBOARDING_PROMOTION_URL', value: 'URL' },
    { index: 1, display: 'ONBOARDING_PROMOTION_PHONE', value: 'PHONE' },
    { index: 2, display: 'ONBOARDING_PROMOTION_EMAIL', value: 'EMAIL' },
    { index: 3, display: 'ONBOARDING_PROMOTION_ADDRESS', value: 'ADDRESS' },
    { index: 4, display: 'ONBOARDING_PROMOTION_NO_ACTION', value: 'NO_ACTION' },
    { index: 5, display: 'ONBOARDING_PROMOTION_CUSTOM', value: 'CUSTOM' }
  ];

  platforms: string[] = ['story', 'post', 'tweet', 'article'];
  platform_labels: string[] = ['ONBOARDING_PROMOTION_STORIES', 'ONBOARDING_PROMOTION_POSTS', 'ONBOARDING_PROMOTION_TWEETS', 'ONBOARDING_PROMOTION_BLOGS'];

  company_uuid: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private route: ActivatedRoute  // Añade ActivatedRoute al constructor
  ) {}

  ngOnInit(): void {
    this.promotionTitleFormGroup = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
    this.promotionDescriptionFormGroup = this._formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1000)]],
    });
    this.promotionTargetFormGroup = this._formBuilder.group({
      target: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
    this.promotionCommunicationRulesFormGroup = this._formBuilder.group({
      communication_rules: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
    });
    this.ctaFormGroup = this._formBuilder.group({
      call_to_action_type: ['', Validators.required],
      call_to_action: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      language: ['', Validators.required]
    });
    this.platformFormGroup = this._formBuilder.group({
      platforms: this._formBuilder.array(this.platforms.map(() => new FormControl(false)))
    });

    this.loadCompanyData();
    this.translate.get('ONBOARDING_WELCOME_PROMOTION_TITLE_MESSAGE').subscribe((res: string) => {
      this.typeWriterEffect(res);
    });
  }

  loadCompanyData(): void {
    this.route.paramMap.subscribe(params => {
      const company_uuid_from_url = params.get('company_uuid');

      if (company_uuid_from_url && company_uuid_from_url.length > 10) { // tmp fix
        this.company_uuid = company_uuid_from_url;
      } else {
        this.httpClient.get('/api/company').subscribe((response: any) => {
          if (response.length === 0) {
            document.location = '/onboarding-company';
          }
          this.company_uuid = response[0].uuid;
          this.checkForExistingPromotion();
        });
      }
    });
  }

  checkForExistingPromotion(): void {
    this.httpClient.get('/api/promotion/company/' + this.company_uuid).subscribe((response: any) => {
      if (response.length > 0) {
        document.location = '/panel';
      }
    });
  }

  get platformsFormArray() {
    return this.platformFormGroup.get('platforms') as FormArray;
  }

  onStepChange(event: any): void {
    const index = event.selectedIndex;
    switch (index) {
      case 0:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_TITLE_MESSAGE';
        break;
      case 1:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_DESCRIPTION_MESSAGE';
        break;
      case 2:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_TARGET_MESSAGE';
        break;
      case 3:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_COMMUNICATION_RULES_MESSAGE';
        break;
      case 4:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_CTA_MESSAGE';
        break;
      case 5:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_PLATFORMS_MESSAGE';
        break;
      default:
        this.currentMessage = 'ONBOARDING_WELCOME_PROMOTION_TITLE_MESSAGE';
    }
    this.translate.get(this.currentMessage).subscribe((res: string) => {
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

  onSubmit(): void {
    this.error = '';
    if (
      this.promotionTitleFormGroup.valid &&
      this.promotionDescriptionFormGroup.valid &&
      this.promotionTargetFormGroup.valid &&
      this.promotionCommunicationRulesFormGroup.valid &&
      this.ctaFormGroup.valid &&
      this.platformFormGroup.valid
    ) {
      const formData = {
        company_uuid: this.company_uuid,
        title: this.promotionTitleFormGroup.value.title,
        description: this.promotionTitleFormGroup.value.title,
        about: this.promotionDescriptionFormGroup.value.description,
        target: this.promotionTargetFormGroup.value.target,
        communication_rules: this.promotionCommunicationRulesFormGroup.value.communication_rules,
        call_to_action_type: this.actionTypes[this.ctaFormGroup.value.call_to_action_type].value,
        call_to_action: this.ctaFormGroup.value.call_to_action,
        language: this.ctaFormGroup.value.language,
        platforms: this.platformFormGroup.value.platforms.map((value: boolean, index: number) => value ? this.platforms[index] : null).filter((value: string | null) => value !== null),
      };

      this.httpClient.post('/api/promotion', formData).pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      ).subscribe((response: any) => {
        document.location.href = '/onboarding-subscribe';
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
