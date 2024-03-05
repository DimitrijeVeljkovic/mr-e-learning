import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedPageRoutingModule } from './completed-routing.module';

import { CompletedPage } from './completed.page';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedPageRoutingModule,
    CourseCardComponent,
  ],
  declarations: [CompletedPage],
})
export class CompletedPageModule {}
