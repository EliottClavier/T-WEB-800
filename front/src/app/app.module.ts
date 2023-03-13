import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
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
import {HttpClientModule} from "@angular/common/http"
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DateRangeComponent } from './components/inputs/date-range/date-range.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SimpleButtonComponent } from './components/buttons/simple-button/simple-button.component';
import { SearchBarComponent } from './containers/search-bar/search-bar.component';
import { MainComponent } from './layouts/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    SearchInputComponent,
    DateRangeComponent,
    SimpleButtonComponent,
    SearchBarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    RegisterUserComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
