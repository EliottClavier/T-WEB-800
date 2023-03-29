import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit, AfterContentChecked {

  @Input() public radioLabelList: string[] = [];
  @Output() public selectedOptionChange = new EventEmitter<string>();
  private _selectedOption: string = "";

  set selectedOption(value: string) {
    this._selectedOption = value;
    this.selectedOptionChange.emit(this.selectedOption);

  }

  constructor(private translateService: TranslateService) {

  }


  get selectedOption(): string {
    return this._selectedOption;
  }

  public ngOnInit(): void {

  }
  ngAfterContentChecked(): void {
    this.radioLabelList.length > 0 && (this.radioLabelList =  this.radioLabelList.map((value)=> this.translateService.instant(value)))
  }
}
