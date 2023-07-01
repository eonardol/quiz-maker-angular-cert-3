import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, tap } from 'rxjs';
import { Category, CategoryWithSub, Difficulty, Question } from '../../../models/data.models';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-maker-next',
  templateUrl: './quiz-maker-next.component.html',
  styleUrls: ['./quiz-maker-next.component.css']
})
export class QuizMakerNextComponent {

  form: FormGroup;

  categories$: Observable<CategoryWithSub[]>;
  subcategories$: Observable<Category[] | undefined> | Observable<null>;

  questions$!: Observable<Question[]>;

  constructor(private fb: FormBuilder, protected quizService: QuizService) {

    this.form = this.fb.group({
      mainCategory: [{value: null, disabled: false}, [Validators.required]],
      subCategory: [{value: null, disabled: false}],
      difficulty: [{value: '', disabled: false}, [Validators.required]],
   });

    this.categories$ = quizService.getAllCategories();

    this.subcategories$ = this.form.get("mainCategory")?.valueChanges.pipe(
      tap((mainCategory: CategoryWithSub)=>{
        console.log("cambiata la mainCategory!", mainCategory);
        const subCategoryCtrl = this.form.get("subCategory");
        subCategoryCtrl?.reset();
        if (mainCategory?.subcategories && mainCategory.subcategories.length>0) {
          subCategoryCtrl?.addValidators(Validators.required);
        }
        else {
          subCategoryCtrl?.clearValidators();
        }
        subCategoryCtrl?.updateValueAndValidity();
      }),
      map((mainCategory: CategoryWithSub) => mainCategory?.subcategories)
    ) || of(null);
  }

  getFormControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  createQuiz(): void {
    if (this.form.invalid) {
      console.log("form invalid", this.form);
      this.form.markAllAsTouched();
      return;
    }

    const { mainCategory, subCategory, difficulty } = this.form.value;

    this.questions$ = this.quizService.createQuiz(mainCategory.id || subCategory.id, difficulty as Difficulty);
  }
}
