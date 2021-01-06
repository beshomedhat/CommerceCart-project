import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { RegisterComponent } from './shared/auth/register/register.component';
import { HomeComponent } from './shared/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminService } from './services/admin/admin.service';
import { AdminInterceptor } from './interceptors/admin/admin.interceptor';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { AllProductsComponent } from './pages/product/all-products/all-products.component';
import { AddProductImgComponent } from './pages/product/add-product-img/add-product-img.component';
import { OneProductComponent } from './pages/product/one-product/one-product.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { IncomingOrdersComponent } from './pages/order/incoming-orders/incoming-orders.component';
import { AcceptedOrdersComponent } from './pages/order/accepted-orders/accepted-orders.component';
import { OneOrderComponent } from './pages/order/one-order/one-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ProfileComponent,
    NotFoundComponent,
    AddProductComponent,
    AllProductsComponent,
    AddProductImgComponent,
    OneProductComponent,
    EditProductComponent,
    IncomingOrdersComponent,
    AcceptedOrdersComponent,
    OneOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AdminService,
    {
     provide:HTTP_INTERCEPTORS,
     useClass:AdminInterceptor,
     multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
