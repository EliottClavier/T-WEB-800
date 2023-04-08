import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-step-dates-filters',
  templateUrl: './step-dates-filters.component.html',
  styleUrls: ['./step-dates-filters.component.scss']
})
export class StepDatesFiltersComponent {

  @Input() public selectedSearchForm: FormGroup = new FormGroup<any>({});

}
