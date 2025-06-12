import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCreatePromotionComponent } from './onboarding-create-promotion.component';

describe('OnboardingCreatePromotionComponent', () => {
  let component: OnboardingCreatePromotionComponent;
  let fixture: ComponentFixture<OnboardingCreatePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingCreatePromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingCreatePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
