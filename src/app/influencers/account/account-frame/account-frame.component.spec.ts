import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFrameComponent } from './account-frame.component';

describe('AccountFrameComponent', () => {
  let component: AccountFrameComponent;
  let fixture: ComponentFixture<AccountFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
