import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSubscribeTransferComponent } from './onboarding-subscribe-transfer.component';

describe('OnboardingSubscribeTransferComponent', () => {
  let component: OnboardingSubscribeTransferComponent;
  let fixture: ComponentFixture<OnboardingSubscribeTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSubscribeTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingSubscribeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
