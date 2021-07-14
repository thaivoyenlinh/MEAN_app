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

    { path: 'admin/category',
      loadChildren: () => import('./components/admin/create/create.module').then(m => m.CreateModule)
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
