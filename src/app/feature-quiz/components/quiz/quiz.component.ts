import {Component, inject, Input} from '@angular/core';
import {Question} from '../../../models/data.models';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  _questions: Question[] | null = [];
  _extraQuestion: Question | null = null;

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  @Input()
  set questions(questions: Question[] | null) {
    this._questions = questions?.slice(0, 5) || null;
    this._extraQuestion = questions ? questions[5] : null;
    this.userAnswers = [];
  }

  submit(): void {
    this.quizService.computeScore(this._questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }

  swapQuestion(index: number) {
    if (!this._questions || !this._extraQuestion) return;
    this.userAnswers[index] = '';
    this._questions[index] = this._extraQuestion;
    this._extraQuestion = null;
  }

  allQuestionAnswered(): boolean {
    return this.userAnswers.filter(el=>el).length == 5;
  }

}
