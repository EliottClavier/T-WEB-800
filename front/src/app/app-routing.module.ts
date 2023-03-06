import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {LocationComponent} from "./components/inputs/location/location.component";

const routes: Routes = [
  { path: '', redirectTo: '/register-user', pathMatch: 'full' },
  { path: 'location', component: LocationComponent },
  { path: 'register-user', component: RegisterUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
