import { ValidateButtonComponent } from './validate-button.component';
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../../app.module";

describe('ValidateButtonComponent', () => {
  let component: ValidateButtonComponent;
  let spectator: Spectator<ValidateButtonComponent>;

  const createComponent = createComponentFactory({
    component: ValidateButtonComponent,
    imports: [ AppModule ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
