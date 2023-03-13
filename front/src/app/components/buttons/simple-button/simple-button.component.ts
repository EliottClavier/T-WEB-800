import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss']
})
export class SimpleButtonComponent {

  @Input() public isDisabled: boolean = false;
  @Input() public isHidden: boolean = false;
  @Input() public label: string = '';

  @Output() public validate: EventEmitter<void> = new EventEmitter<void>();

  public onClickButton(): void {
    this.validate.emit();
  }

}
