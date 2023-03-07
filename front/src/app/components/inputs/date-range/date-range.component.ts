import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

    public dateRange: FormGroup = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });

}
