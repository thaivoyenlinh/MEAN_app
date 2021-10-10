import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//? Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';
import { NavHomeComponent } from './components/home/nav-home/nav-home.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CartComponent } from './components/cart/cart.component';
import { DeleteConfirmationComponent } from './components/dialog/delete-confirmation/delete-confirmation.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

//! Lazy-loading Component is import at that component

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// ?import to use Material Component for UI's user
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

  // core.js:9110 ERROR Error: Uncaught (in promise): NullInjectorError: StaticInjectorError(AppModule)[GalleryComponent -> Gallery]: 
  // StaticInjectorError(Platform: core)[GalleryComponent -> Gallery]: 
  // NullInjectorError: No provider for Gallery!  
  //! solve: import Gallery and declare into providers
import { GalleryModule, Gallery } from 'ng-gallery';
import { NgxGalleryModule } from 'ngx-gallery';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    SignUpComponent,
    SignInComponent,
    AdminComponent,
    CategoryComponent,
    ItemComponent,
    NavHomeComponent,
    ListItemComponent,
    ItemDetailsComponent,
    CartComponent,
    DeleteConfirmationComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    MatGridListModule,
    GalleryModule,
    NgxGalleryModule,
  ],

  providers: [Gallery],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationComponent],
})
export class AppModule { }
