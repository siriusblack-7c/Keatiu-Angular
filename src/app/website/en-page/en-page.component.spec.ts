import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnPageComponent } from './en-page.component';

describe('EnPageComponent', () => {
  let component: EnPageComponent;
  let fixture: ComponentFixture<EnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
