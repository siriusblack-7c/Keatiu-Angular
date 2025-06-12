import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {NgIf, NgStyle} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FooterComponent} from "../../website/home/footer/footer.component";
import {HeaderComponent} from "../../website/home/header/header.component";
import {MatCard, MatCardActions} from "@angular/material/card";
import {HeaderAuthenticatedComponent} from "../header-authenticated/header-authenticated.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-onboarding-create-company',
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
        TranslateModule,
        FooterComponent,
        HeaderComponent,
        MatCard,
        MatCardActions,
        HeaderAuthenticatedComponent
    ],
  templateUrl: './onboarding-create-company.component.html',
  styleUrl: './onboarding-create-company.component.scss'
})
export class OnboardingCreateCompanyComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  error: string = '';
  currentMessage: string = 'ONBOARDING_WELCOME_INTERVIEW_INTRO';
  displayedText: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      marca: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      actividad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      vision: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
    this.fourthFormGroup = this._formBuilder.group({
      misionValores: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1000)]],
    });
    this.fifthFormGroup = this._formBuilder.group({
      web: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      telefono: ['', [Validators.minLength(9), Validators.maxLength(15)]],
    });

    this.checkUserStatus();
    this.translate.get('ONBOARDING_WELCOME_INTERVIEW_INTRO').subscribe((res: string) => {
      this.typeWriterEffect(res);
    });
  }

  checkUserStatus() {
    if (!localStorage.getItem('yoog_session')) {
      document.location = '/register';
    }

    this.router.paramMap.subscribe(params => {
      const newCompany = params.get('new');
      if (!newCompany) {
        this.httpClient.get('/api/company').subscribe((response: any) => {
          if (response.length > 0) {
            document.location = '/onboarding-promotion';
          }
        });
      }
    });
  }

  onStepChange(event: any): void {
    const index = event.selectedIndex;
    switch (index) {
      case 0:
        this.currentMessage = 'ONBOARDING_WELCOME_INTERVIEW_INTRO';
        break;
      case 1:
        this.currentMessage = 'ONBOARDING_WELCOME_ACTIVITY_MESSAGE';
        break;
      case 2:
        this.currentMessage = 'ONBOARDING_WELCOME_VISION_MESSAGE';
        break;
      case 3:
        this.currentMessage = 'ONBOARDING_WELCOME_MISSION_MESSAGE';
        break;
      case 4:
        this.currentMessage = 'ONBOARDING_WELCOME_CONTACT_MESSAGE';
        break;
      default:
        this.currentMessage = 'ONBOARDING_WELCOME_INTERVIEW_INTRO';
    }
    this.translate.get(this.currentMessage).subscribe((res: string) => {
      this.typeWriterEffect(res);
    });
  }

  typeWriterEffect(text: string): void {
    this.displayedText = '';
    let i = 0;
    const speed = 25;

    const typeWriter = () => {
      if (i < text.length) {
        this.displayedText += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        this.displayedText = text;
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
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid &&
      this.fifthFormGroup.valid
    ) {
      const formData = {
        name: null,
        nif: null,
        address: null,
        brand: this.firstFormGroup.value.marca,
        activity: this.secondFormGroup.value.actividad,
        vision: this.thirdFormGroup.value.vision,
        mission_and_values: this.fourthFormGroup.value.misionValores,
        web: this.fifthFormGroup.value.web || null,
        phone: this.fifthFormGroup.value.telefono || null
      };

      this.httpClient.post('/api/company', formData).pipe(
        catchError((error: any) => {
          this.error = error.error.message;
          return throwError(error);
        })
      ).subscribe((response: any) => {
        document.location = '/onboarding-promotion/new';
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
