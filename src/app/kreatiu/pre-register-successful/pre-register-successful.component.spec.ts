import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterSuccessfulComponent } from './pre-register-successful.component';

describe('PreRegisterSuccessfulComponent', () => {
  let component: PreRegisterSuccessfulComponent;
  let fixture: ComponentFixture<PreRegisterSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreRegisterSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreRegisterSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
