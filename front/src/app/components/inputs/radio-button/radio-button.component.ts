import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit, AfterContentChecked {

  @Input() public radioLabelList: string[] = [];
  @Output() public selectedOptionChange = new EventEmitter<number>();
  private _selectedOption: number = 0;

  set selectedOption(value: number) {
    this._selectedOption = value;
    this.selectedOptionChange.emit(this.selectedOption);


  }

  constructor(private translateService: TranslateService) {

  }


  get selectedOption(): number {
    return this._selectedOption;
  }

  public ngOnInit(): void {
  }
  ngAfterContentChecked(): void {
     this.radioLabelList.length > 0 && (this.radioLabelList =  this.radioLabelList.map((value)=> this.translateService.instant(value)))

  }
}
