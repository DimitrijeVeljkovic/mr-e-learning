import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InProgressPageRoutingModule } from './in-progress-routing.module';

import { InProgressPage } from './in-progress.page';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InProgressPageRoutingModule,
    CourseCardComponent,
  ],
  declarations: [InProgressPage],
})
export class InProgressPageModule {}
