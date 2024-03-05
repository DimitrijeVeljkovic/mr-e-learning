import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesPageModule),
  },
  {
    path: 'learning-paths',
    loadChildren: () =>
      import('./pages/learning-paths/learning-paths.module').then(
        (m) => m.LearningPathsPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'in-progress',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/in-progress/in-progress.module').then(
            (m) => m.InProgressPageModule
          ),
      },
      {
        path: ':courseId',
        loadChildren: () =>
          import('./pages/course/course.module').then(
            (m) => m.CoursePageModule
          ),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./pages/bookmarks/bookmarks.module').then(
        (m) => m.BookmarksPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'completed',
    loadChildren: () =>
      import('./pages/completed/completed.module').then(
        (m) => m.CompletedPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'courses' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
