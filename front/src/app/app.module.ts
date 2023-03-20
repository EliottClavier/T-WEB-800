import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './containers/register-user/register-user.component';
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
import { SearchInputComponent } from './components/inputs/search-input/search-input.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http"
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DateRangeComponent } from './components/inputs/date-range/date-range.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SimpleButtonComponent } from './components/buttons/simple-button/simple-button.component';
import { MultipleSearchBarsComponent } from './containers/multiple-search-bars/multiple-search-bars.component';
import { MainComponent } from './layouts/main/main.component';
import { SimpleIconButtonComponent } from './components/buttons/simple-icon-button/simple-icon-button.component';
import { ExploreComponent } from './layouts/explore/explore.component';
import { SingleSearchBarComponent } from './containers/single-search-bar/single-search-bar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {LoginUserComponent} from "./containers/login-user/login-user.component";
import { HeaderComponent } from './components/header/header.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { MapComponent } from './containers/map/map.component';
import {MapFiltersComponent} from "./containers/map-filters/map-filters.component";

@NgModule({
  declarations: [
    AppComponent,
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
    MapFiltersComponent
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
    BrowserAnimationsModule,
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    RegisterUserComponent,
    LoginUserComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
