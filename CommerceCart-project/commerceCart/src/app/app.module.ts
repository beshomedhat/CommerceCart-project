import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './shared/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductComponent } from './pages/products/product/product.component';
import { ProductCategoryComponent } from './pages/products/product-category/product-category.component';
import { CartComponent } from './pages/orders/cart/cart.component';
import { AddOrderComponent } from './pages/orders/add-order/add-order.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { RegisterComponent } from './shared/auth/register/register.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CustomerService } from './services/customer/customer.service';
import { CustomerInterceptor } from './interceptors/customer.interceptor';
import { OrderComponent } from './pages/orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    ProductComponent,
    ProductCategoryComponent,
    CartComponent,
    AddOrderComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomerService,
    {
     provide:HTTP_INTERCEPTORS,
     useClass:CustomerInterceptor,
     multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
