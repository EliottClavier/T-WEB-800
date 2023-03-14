import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {MainComponent} from "./layouts/main/main.component";
import {ExploreComponent} from "./layouts/explore/explore.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'explore/:location', component: ExploreComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
