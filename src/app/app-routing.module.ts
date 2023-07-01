import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuizMakerComponent} from './feature-quiz/components/quiz-maker/quiz-maker.component';
import {AnswersComponent} from './feature-quiz/components/answers/answers.component';
import {QuizService} from './feature-quiz/services/quiz.service';
import { QuizMakerNextComponent } from './feature-quiz/components/quiz-maker-next/quiz-maker-next.component';

const routes: Routes = [
  {
    path: "result", component: AnswersComponent, resolve: {data: () => inject(QuizService).getLatestResults()}
  },
  {
    path: "quiz-maker-old", component: QuizMakerComponent
  },
  {
    path: "**", component: QuizMakerNextComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
