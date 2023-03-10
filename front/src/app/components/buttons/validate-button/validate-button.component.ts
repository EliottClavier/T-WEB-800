import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-validate-button',
  templateUrl: './validate-button.component.html',
  styleUrls: ['./validate-button.component.scss']
})
export class ValidateButtonComponent {

  @Input() public isDisabled: boolean = false;
  @Output() public validate: EventEmitter<void> = new EventEmitter<void>();

  public onClickButton(): void {
    this.validate.emit();
  }

}
