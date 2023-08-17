import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookmarksPageRoutingModule } from './bookmarks-routing.module';

import { BookmarksPage } from './bookmarks.page';
import { CourseCardComponent } from '../course-card/course-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookmarksPageRoutingModule,
    CourseCardComponent
  ],
  declarations: [BookmarksPage]
})
export class BookmarksPageModule {}
