import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {MainComponent} from "./layouts/main/main.component";
import {AppComponent} from "./app.component";
import {CardItemComponent} from "./components/card-item/card-item.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register-user', component: RegisterUserComponent },
  {path : 'card', component : CardItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
