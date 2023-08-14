import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { 
    path: 'courses', 
    children: [
      {
        path: '',
        loadChildren: () => import('./components/courses/courses.module').then(m => m.CoursesPageModule)
      }
    ]
  },
  {
    path: 'learning-paths',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/learning-paths/learning-paths.module').then( m => m.LearningPathsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
