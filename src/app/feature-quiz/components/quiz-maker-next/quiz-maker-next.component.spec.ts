import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMakerNextComponent } from './quiz-maker-next.component';

describe('QuizMakerNextComponent', () => {
  let component: QuizMakerNextComponent;
  let fixture: ComponentFixture<QuizMakerNextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMakerNextComponent]
    });
    fixture = TestBed.createComponent(QuizMakerNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
