import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component'; 
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserComponent } from './components/user/user.component';
import { OrderComponent } from './components/order/order.component';

//! Lazy-loading Component is import at that component  
//import { CreateComponent } from './components/admin/create/create.component'; 

const routes: Routes = [
  { path: '', component: HomeComponent},
  
  { path: 'listitem', component: ListItemComponent},

  { path: 'itemdetails', component: ItemDetailsComponent},

  { path: 'cart', component: CartComponent},

  { path: 'checkout', component: CheckoutComponent},

  { path: 'admin', component: AdminComponent, children: [
    
    { path: 'category', component: CategoryComponent},

    { path: 'category/create',
      loadChildren: () => import('./components/category/create-category/create-category.module').then(m => m.CreateCategoryModule)
    },

    { path: 'category/edit',
      loadChildren: () => import('./components/category/edit-category/edit-category.module').then(m => m.EditCategoryModule)
    },

    { path: 'item', component: ItemComponent},

    { path: 'item/create',
      loadChildren: () => import('./components/item/create-item/create-item.module').then(m => m.CreateItemModule)
    },

    { path: 'item/edit',
      loadChildren: () => import('./components/item/edit-item/edit-item.module').then(m => m.EditItemModule)
    },

    { path: 'user', component: UserComponent},

    { path: 'order', component: OrderComponent},

  ]},

  { path: 'sign_up', component: SignUpComponent},
  { path: 'sign_in', component: SignInComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
