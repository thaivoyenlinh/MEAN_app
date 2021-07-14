// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create.component'; 
import { CreateRoutingModule} from './create-routing.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule ({
    declarations: [
        CreateComponent,
    ],
    imports: [
        CreateRoutingModule,
        // BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})

export class CreateModule {}