import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./layouts/main/main.component";
import {ExploreComponent} from "./layouts/explore/explore.component";
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import {AuthGuard} from "./guards/auth.guard";
import {TripsContainerComponent} from "./containers/trips-container/trips-container.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'explore/:location', component: ExploreComponent },
  { path: 'my-trips', component: TripsContainerComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
