import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() public searchForm: FormGroup = new FormGroup<any>({});

  public ngOnInit(): void {
    // Add controls
    this.searchForm.addControl(
      "start", new FormControl<Date | null>(null, [ Validators.required ])
    );
    this.searchForm.addControl(
      "end", new FormControl<Date | null>(null, [ Validators.required ])
    );
  }

  get start(): FormControl {
    return this.searchForm.get("start")! as FormControl;
  }

  get end(): FormControl {
    return this.searchForm.get("end")! as FormControl;
  }

}
