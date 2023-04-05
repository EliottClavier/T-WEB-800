import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./layouts/main/main.component";
import {ExploreComponent} from "./layouts/explore/explore.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'explore/:location', component: ExploreComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
