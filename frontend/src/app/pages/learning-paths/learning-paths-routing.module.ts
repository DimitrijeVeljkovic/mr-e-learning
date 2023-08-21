import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningPathsPage } from './learning-paths.page';

const routes: Routes = [
  {
    path: '',
    component: LearningPathsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningPathsPageRoutingModule {}
