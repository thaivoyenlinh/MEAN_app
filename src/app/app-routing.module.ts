import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component'; 
import { CategoryComponent } from './components/category/category.component';

//! Lazy-loading Component is import at that component  
//import { CreateComponent } from './components/admin/create/create.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent},

  { path: 'admin', component: AdminComponent, children: [
    { path: 'admin/category', component: CategoryComponent},

    { path: 'admin/category/create',
      loadChildren: () => import('./components/category/create-category/create-category.module').then(m => m.CreateCategoryModule)
    },

    { path: 'admin/category/edit',
      loadChildren: () => import('./components/category/edit-category/edit-category.module').then(m => m.EditCategoryModule)
    }

  ]},

  { path: 'sign_up', component: SignUpComponent},
  { path: 'sign_in', component: SignInComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
