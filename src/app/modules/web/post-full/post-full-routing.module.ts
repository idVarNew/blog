import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostFullComponent} from './post-full.component';

const routes: Routes = [
  {
    path: '',
    component: PostFullComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostFullRoutingModule {}
