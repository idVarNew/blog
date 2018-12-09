import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WebComponent } from './web.component';
import { WebRoutingModule } from './web-routing.module';
import { HeaderComponent } from 'src/app/core';


@NgModule({
  imports: [
    CommonModule,    
    NgbModule,
    WebRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [WebComponent, HeaderComponent, ],
  exports: [WebComponent]
})
export class WebModule {}
