import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateItemComponent } from './create-item.component'; 
import { CreateItemRountingModule } from './create-item-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//? form
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

//! ERROR Error: Uncaught (in promise): NullInjectorError: 
//! StaticInjectorError(AppModule)[QuillEditorComponent -> QuillService]
import { QuillModule, QuillService } from 'ngx-quill';

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
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        QuillModule,
    ],
    providers: [
        QuillService,
    ]
})

export class CreateItemModule { }