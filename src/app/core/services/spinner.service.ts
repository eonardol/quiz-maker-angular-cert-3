import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private subject = new BehaviorSubject<boolean>(false);

  private counter: number = 0;

  constructor() { }

  show(): void {
    this.counter++;
    if (this.counter > 0) {
      this.subject.next(true);
    }
  }

  hide(): void {
    this.counter--;

    if (this.counter <= 0) {
      this.subject.next(false);
      this.counter = 0;
    }
  }

  getSpinnerStatus(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
