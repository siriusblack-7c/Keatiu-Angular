import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCreateCompanyComponent } from './onboarding-create-company.component';

describe('OnboardingCreateCompanyComponent', () => {
  let component: OnboardingCreateCompanyComponent;
  let fixture: ComponentFixture<OnboardingCreateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingCreateCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingCreateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
