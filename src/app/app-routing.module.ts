import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from './feature-list/feature-list.component';

const routes: Routes = [
  { path: '', component: FeatureListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
