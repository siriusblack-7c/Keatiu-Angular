import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorScenesComponent } from './editor-scenes.component';

describe('EditorScenesComponent', () => {
  let component: EditorScenesComponent;
  let fixture: ComponentFixture<EditorScenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorScenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
