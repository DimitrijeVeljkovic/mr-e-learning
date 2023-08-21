import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearningPathsPageRoutingModule } from './learning-paths-routing.module';

import { LearningPathsPage } from './learning-paths.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearningPathsPageRoutingModule
  ],
  declarations: [LearningPathsPage]
})
export class LearningPathsPageModule {}
