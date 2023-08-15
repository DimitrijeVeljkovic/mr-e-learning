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
  },
  {
    path: 'signup',
    loadChildren: () => import('./components/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
