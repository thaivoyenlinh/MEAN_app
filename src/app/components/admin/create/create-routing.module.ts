import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create.component'; 

const routes: Routes = [
    { path: 'create', component: CreateComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // Error so no need => export: [RouterModule]
})

export class CreateRoutingModule {}