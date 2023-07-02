import {Component} from '@angular/core';
import {Category, CategoryWithSub, Difficulty, Question} from '../../../models/data.models';
import {Observable, map, tap} from 'rxjs';
import {QuizService} from '../../services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {

  form: FormGroup;

  categories$: Observable<CategoryWithSub[]>;
  subcategories$: Observable<Category[] | undefined> | undefined;

  questions$!: Observable<Question[]>;

  constructor(private fb: FormBuilder, protected quizService: QuizService) {

    this.form = this.fb.group({
      mainCategory: [{value: '', disabled: false}, [Validators.required]],
      subCategory: [{value: '', disabled: false}],
      difficulty: [{value: '', disabled: false}, [Validators.required]],
   });

    this.categories$ = quizService.getAllCategories();

    this.subcategories$ = this.form.get("mainCategory")?.valueChanges.pipe(
      tap((mainCategory: CategoryWithSub)=>{
        const subCategoryCtrl = this.form.get("subCategory");
        subCategoryCtrl?.setValue("");
        if (mainCategory.subcategories && mainCategory.subcategories.length>0) {
          subCategoryCtrl?.addValidators(Validators.required);
        }
        else {
          subCategoryCtrl?.clearValidators();
        }
        subCategoryCtrl?.updateValueAndValidity();
      }),
      map((mainCategory: CategoryWithSub) => mainCategory.subcategories)
    );
  }

  createQuiz(): void {
    if (this.form.invalid) {
      console.log("invalid form", this.form);
      this.form.markAllAsTouched();
      return;
    }

    const { mainCategory, subCategory, difficulty } = this.form.value;

    this.questions$ = this.quizService.createQuiz(mainCategory.id || subCategory.id, difficulty as Difficulty);
  }

}
