import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditCategoryComponent } from './edit-category.component';
import { EditCategoryRoutingModule } from './edit-category-routing.module';

@NgModule ({
    declarations: [
        EditCategoryComponent,
    ],
    imports: [
        CommonModule,
        EditCategoryRoutingModule,
    ],
})

export class EditCategoryModule { }