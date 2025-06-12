import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorScriptComponent } from './editor-script.component';

describe('EditorScriptComponent', () => {
  let component: EditorScriptComponent;
  let fixture: ComponentFixture<EditorScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
