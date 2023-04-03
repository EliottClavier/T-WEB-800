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
  @Input() public height: string = '56px';
  @Input() public icon: string = '';

  @Output() public buttonClick: EventEmitter<any> = new EventEmitter<any>();

  public onClickButton($event? : any): void {
    this.buttonClick.emit($event);
  }

}
