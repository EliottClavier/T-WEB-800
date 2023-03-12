import { MainComponent } from './main.component';
import {SearchBarComponent} from "../../containers/search-bar/search-bar.component";
import {createComponentFactory, Spectator} from "@ngneat/spectator";
import {AppModule} from "../../app.module";
import {By} from "@angular/platform-browser";

describe('MainComponent', () => {
  let component: MainComponent;
  let spectator: Spectator<MainComponent>;

  const createComponent = createComponentFactory({
    component: MainComponent,
    declarations: [
      MainComponent,
      SearchBarComponent,
    ],
    imports: [
      AppModule
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a search bar component with multiple search disabled', () => {
    let searchBar = spectator.debugElement.query(By.css("app-search-bar[search-bar]"))!;
    let searchBarComponent: SearchBarComponent = searchBar.componentInstance as SearchBarComponent;
    expect(searchBarComponent).toBeDefined();
    expect(searchBarComponent.multipleSearch).toBe(false);
  });

});
