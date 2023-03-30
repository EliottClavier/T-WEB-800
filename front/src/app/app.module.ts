import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterUserComponent} from './containers/register-user/register-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {SearchInputComponent} from './components/inputs/search-input/search-input.component';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http"
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DateRangeComponent} from './components/inputs/date-range/date-range.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {SimpleButtonComponent} from './components/buttons/simple-button/simple-button.component';
import {MultipleSearchBarsComponent} from './containers/multiple-search-bars/multiple-search-bars.component';
import {MainComponent} from './layouts/main/main.component';
import {SimpleIconButtonComponent} from './components/buttons/simple-icon-button/simple-icon-button.component';
import {ExploreComponent} from './layouts/explore/explore.component';
import {SingleSearchBarComponent} from './containers/single-search-bar/single-search-bar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {LoginUserComponent} from "./containers/login-user/login-user.component";
import {HeaderComponent} from './components/header/header.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {MapComponent} from './containers/map/map.component';
import {MapFiltersComponent} from "./containers/map-filters/map-filters.component";
import {CardItemComponent} from './components/card-item/card-item.component';
import {CardItemsListComponent} from './components/card-items-list/card-items-list.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CardsContainerComponent} from './containers/cards-container/cards-container.component';
import {CardItemDetailsViewComponent} from './components/card-item-details-view/card-item-details-view.component';
import {
  MapTravelModeSelectionComponent
} from './containers/map-travel-mode-selection/map-travel-mode-selection.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CardItemComponent,
    CardItemsListComponent,
    RegisterUserComponent,
    LoginUserComponent,
    SearchInputComponent,
    DateRangeComponent,
    SimpleButtonComponent,
    MainComponent,
    HeaderComponent,
    MultipleSearchBarsComponent,
    MainComponent,
    SimpleIconButtonComponent,
    ExploreComponent,
    SingleSearchBarComponent,
    MapComponent,
    MainComponent,
    CardsContainerComponent,
    MapComponent,
    MapFiltersComponent,
    CardItemDetailsViewComponent,
    MapTravelModeSelectionComponent,
    CarouselComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      },
    )
  ],
  exports: [
    RegisterUserComponent,
    LoginUserComponent,
    RegisterUserComponent,
    BrowserAnimationsModule,
    MatCardModule,
    TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
