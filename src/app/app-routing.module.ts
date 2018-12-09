import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from './core/services/authentication-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './modules/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
   {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [AuthenticationGuardService]
  },
 
  {
    path: '',
    loadChildren: './modules/web/web.module#WebModule',
   // canActivate: [AuthenticationGuardService],  
  },
  /*
  {
    path: '',
    loadChildren: './modules/posts/posts.module#PostsModule',
    canActivate: [AuthenticationGuardService]
  },
  */

  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
