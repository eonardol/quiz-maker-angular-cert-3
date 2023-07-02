import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  spinnerStatus$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerStatus$ = this.spinnerService.getSpinnerStatus();
  }

}
