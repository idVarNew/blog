import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DescriptionComponent } from './components/description/description.component';
import { TitleComponent } from './components/title/title.component';
import { LabelTagsComponent } from './components/label-tags/label-tags.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        DescriptionComponent,
        TitleComponent,
        LabelTagsComponent       
    ],
    exports: [
        DescriptionComponent,
        TitleComponent,
        LabelTagsComponent
    ]
})
export class AdminSharedModule { }