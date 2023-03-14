import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './containers/register-user/register-user.component';
import {MainComponent} from "./layouts/main/main.component";
import {LoginUserComponent} from "./containers/login-user/login-user.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'login', component: LoginUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
