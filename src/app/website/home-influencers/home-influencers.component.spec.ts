import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInfluencersComponent } from './home-influencers.component';

describe('HomeInfluencersComponent', () => {
  let component: HomeInfluencersComponent;
  let fixture: ComponentFixture<HomeInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInfluencersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
