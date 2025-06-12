import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSuscribeComponent } from './onboarding-suscribe.component';

describe('OnboardingSuscribeComponent', () => {
  let component: OnboardingSuscribeComponent;
  let fixture: ComponentFixture<OnboardingSuscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingSuscribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingSuscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
