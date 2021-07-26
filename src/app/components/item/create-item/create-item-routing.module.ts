import { NgModule } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';
import { CreateItemComponent } from "./create-item.component";

const routes: Routes = [
    { path: '', component: CreateItemComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CreateItemRountingModule { }