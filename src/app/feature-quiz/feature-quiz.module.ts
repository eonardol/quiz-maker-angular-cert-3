import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswersComponent } from './components/answers/answers.component';



@NgModule({
  declarations: [
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FeatureQuizModule { }
