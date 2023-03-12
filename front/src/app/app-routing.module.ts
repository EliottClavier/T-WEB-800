import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {SearchBarComponent} from "./containers/search-bar/search-bar.component";

const routes: Routes = [
  { path: '', redirectTo: '/register-user', pathMatch: 'full' },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'home', component: SearchBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
