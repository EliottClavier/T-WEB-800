import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-simple-icon-button',
  templateUrl: './simple-icon-button.component.html',
  styleUrls: ['./simple-icon-button.component.scss']
})
export class SimpleIconButtonComponent {

  @Input() public isDisabled: boolean = false;
  @Input() public isHidden: boolean = false;
  @Input() public icon: string = '';
  @Input() public color: string = '' //ThemePalette = 'primary';
  @Input() public buttonType: 'mini-fab' | 'icon' = 'icon';
  @Input() public noInteraction: boolean = false;
  @Input() public size: string = '56px';

  @Output() public buttonClick: EventEmitter<void> = new EventEmitter<void>();

  public onClickButton(): void {
    this.buttonClick.emit();
  }
}
