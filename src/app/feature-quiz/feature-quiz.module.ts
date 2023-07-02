import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswersComponent } from './components/answers/answers.component';
import { SharedModule } from '../shared/shared.module';
import { QuizMakerNextComponent } from './components/quiz-maker-next/quiz-maker-next.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    QuizMakerNextComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FeatureQuizModule { }
