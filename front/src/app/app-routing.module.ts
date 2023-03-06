import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CardItemComponent} from "./card-item/card-item.component";


const routes: Routes = [
  {
    path: '',redirectTo: 'app',pathMatch: 'full'},
  {path : 'card', component : CardItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
