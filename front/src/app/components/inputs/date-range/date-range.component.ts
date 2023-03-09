import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() public searchForm: FormGroup = new FormGroup<any>({});

  public ngOnInit(): void {
    this.searchForm.addControl(
      "start", new FormControl<Date | null>(null)
    );
    this.searchForm.addControl(
      "end", new FormControl<Date | null>(null)
    );
  }

}
