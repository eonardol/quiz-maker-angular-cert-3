import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuizMakerComponent} from './feature-quiz/components/quiz-maker/quiz-maker.component';
import {AnswersComponent} from './feature-quiz/components/answers/answers.component';
import {QuizService} from './feature-quiz/services/quiz.service';

const routes: Routes = [{
  path: "result", component: AnswersComponent, resolve: {data: () => inject(QuizService).getLatestResults()}
},{
  path: "**", component: QuizMakerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
