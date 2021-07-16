import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditCategoryComponent } from './edit-category.component';
import { EditCategoryRoutingModule } from './edit-category-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//? to use form
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule ({
    declarations: [
        EditCategoryComponent,
    ],
    imports: [
        CommonModule,
        EditCategoryRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})

export class EditCategoryModule { }