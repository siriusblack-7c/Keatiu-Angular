import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsPageComponent } from './es-page.component';

describe('EsPageComponent', () => {
  let component: EsPageComponent;
  let fixture: ComponentFixture<EsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
