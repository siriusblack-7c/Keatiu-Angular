import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInfluencersComponent } from './header-influencers.component';

describe('HeaderInfluencersComponent', () => {
  let component: HeaderInfluencersComponent;
  let fixture: ComponentFixture<HeaderInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInfluencersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
