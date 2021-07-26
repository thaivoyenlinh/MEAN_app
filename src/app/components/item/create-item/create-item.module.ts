import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateItemComponent } from './create-item.component'; 
import { CreateItemRountingModule } from './create-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//? form
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        CreateItemComponent,
    ],
    imports: [
        CommonModule,
        CreateItemRountingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})

export class CreateItemModule { }