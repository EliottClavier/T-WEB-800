import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {SearchInputComponent} from "./components/inputs/search-input/search-input.component";
import {DateRangeComponent} from "./components/inputs/date-range/date-range.component";

const routes: Routes = [
  { path: '', redirectTo: '/register-user', pathMatch: 'full' },
  { path: 'location', component: SearchInputComponent },
  { path: 'date-range', component: DateRangeComponent },
  { path: 'register-user', component: RegisterUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
