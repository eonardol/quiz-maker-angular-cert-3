import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Category, Difficulty, ApiQuestion, Question, Results, CategoryWithSub} from './data.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryWithSub[]> {
    return this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php").pipe(
      map(res => res.trivia_categories),
      map(categoryList => {
        return categoryList.reduce((acc, currentCategory) => { 
          if (currentCategory.name.indexOf(": ") > -1) {
            const [mainCategoryName, subCategoryName] = currentCategory.name.split(": ");
            let mainCategory = acc.find(el=>el.name === mainCategoryName);
            if (!mainCategory) {
              mainCategory = {id: 0, name: mainCategoryName, subcategories: []};
              acc.push(mainCategory);
            }

            mainCategory.subcategories?.push({...currentCategory, name: subCategoryName});
          }
          else {
            acc.push(currentCategory);
          }

          return acc;
        }, [] as CategoryWithSub[]);
      })
    );
  }

  createQuiz(categoryId: string, difficulty: Difficulty): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=5&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }
}
