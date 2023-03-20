import { HeaderComponent } from './header.component'
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatCardModule} from "@angular/material/card";
import {SimpleButtonComponent} from "../buttons/simple-button/simple-button.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [
      RouterTestingModule,
      MatCardModule
    ],
    declarations: [
      HeaderComponent,
      SimpleButtonComponent
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to /login when login button is clicked', () => {
    spyOn(component['router'], 'navigate');
    let button: HTMLElement = spectator.query('[header-login] [simple-button]')!;
    button.click();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /register when register button is clicked', () => {
    spyOn(component['router'], 'navigate');
    let button: HTMLElement = spectator.query('[header-register] [simple-button]')!;
    button.click();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/register']);
  });
})
