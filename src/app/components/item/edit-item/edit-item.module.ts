import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditItemComponent } from './edit-item.component';
import { EditItemRountingModule } from './edit-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//? form
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
        EditItemComponent,
    ],
    imports: [
        CommonModule,
        EditItemRountingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
})

export class EditItemModule { }