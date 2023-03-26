import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {SimpleIconButtonComponent} from "./simple-icon-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('SimpleIconButtonComponent', () => {
  let component: SimpleIconButtonComponent;
  let spectator: Spectator<SimpleIconButtonComponent>;

  const createComponent = createComponentFactory({
    component: SimpleIconButtonComponent,
    imports: [
      MatButtonModule,
      MatButtonToggleModule,
      MatTooltipModule,
      MatIconModule,
      BrowserAnimationsModule,
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;

    component.icon = "home";

    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a icon mat-button with specific icon by default', () => {
    expect(spectator.query('button[mat-icon-button][simple-icon-button]')).toBeTruthy();
    expect(spectator.query('button[mat-icon-button][simple-icon-button]>mat-icon[simple-icon]')).toHaveText(component.icon);
  });

  it('should have a mini-fab mat-button with specific icon', () => {
    component.buttonType = 'mini-fab';
    spectator.detectChanges();
    expect(spectator.query('button[mat-mini-fab][simple-icon-button]')).toBeTruthy();
    expect(spectator.query('button[mat-mini-fab][simple-icon-button]>mat-icon[simple-icon]')).toHaveText(component.icon);
  });

  it('should emit the buttonClick event when the button is clicked and not disabled', () => {
    spyOn(component.buttonClick, 'emit');
    // .callThrough() to allow call on the original method while spying on it
    spyOn(component, 'onClickButton').and.callThrough();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    button.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
    expect(component.onClickButton).toHaveBeenCalled();
  });

  it('should not emit the buttonClick event when the button is disabled', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    spyOn(component, 'onClickButton');
    spyOn(component.buttonClick, 'emit');
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    button.click();
    expect(component.onClickButton).not.toHaveBeenCalled();
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should disable the button when isDisabled is true', () => {
    component.isDisabled = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable the button when isDisabled is false', () => {
    component.isDisabled = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('disabled')).toBeFalsy();
  });

  it('should hide the button when isHidden is true', () => {
    component.isHidden = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('hidden')).toEqual('');
  });

  it('should show the button when isHidden is false', () => {
    component.isHidden = false;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('hidden')).toBeFalsy();
  })

  it('should have a color attribute to change theme color', () => {
    component.color = 'warn';
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button.getAttribute('ng-reflect-color')).toEqual(component.color);
  });

  it('should remove material interaction effects and be disabled when noInteraction is true', () => {
    component.noInteraction = true;
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button).toHaveClass('mat-button-icon-no-interaction');
    expect(button.getAttribute('ng-reflect-disabled')).toEqual('true');
  });

  it('should have a size attribute with default value', () => {
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button).toHaveStyle({ height: "56px" });
    expect(button).toHaveStyle({ width: "56px" });
  });

  it('should have a size attribute to change size', () => {
    component.size = "200px";
    spectator.detectChanges();
    const button: HTMLElement = spectator.query('[simple-icon-button]')!;
    expect(button).toHaveStyle({ height: component.size });
    expect(button).toHaveStyle({ width: component.size });
  });
});
