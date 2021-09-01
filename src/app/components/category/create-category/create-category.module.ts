import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateCategoryComponent } from './create-category.component';
import { CreateCategoryRoutingModule } from './create-category-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//? form
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        CreateCategoryComponent,
    ],
    imports: [
        CommonModule,
        CreateCategoryRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
})

export class CreateCategoryModule { }