import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { 
    path: 'courses', 
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesPageModule)
  },
  {
    path: 'learning-paths',
    loadChildren: () => import('./pages/learning-paths/learning-paths.module').then( m => m.LearningPathsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'in-progress',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/in-progress/in-progress.module').then( m => m.InProgressPageModule)
      },
      {
        path: ':courseId',
        loadChildren: () => import('./pages/course/course.module').then( m => m.CoursePageModule)
      }
    ]
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./pages/bookmarks/bookmarks.module').then( m => m.BookmarksPageModule)
  },
  {
    path: 'completed',
    loadChildren: () => import('./pages/completed/completed.module').then( m => m.CompletedPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
