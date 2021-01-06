import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './guard/authguard/auth.guard';
import { NotAuthGuard } from './guard/authguard/not-auth.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AcceptedOrdersComponent } from './pages/order/accepted-orders/accepted-orders.component';
import { IncomingOrdersComponent } from './pages/order/incoming-orders/incoming-orders.component';
import { OneOrderComponent } from './pages/order/one-order/one-order.component';
import { AddProductImgComponent } from './pages/product/add-product-img/add-product-img.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { AllProductsComponent } from './pages/product/all-products/all-products.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { OneProductComponent } from './pages/product/one-product/one-product.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { RegisterComponent } from './shared/auth/register/register.component';
import { HomeComponent } from './shared/home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},

  {path:"login",component:LoginComponent, canActivate:[NotAuthGuard]},
  {path:"register",component:RegisterComponent, canActivate:[NotAuthGuard]},
  {path:"profile",component:ProfileComponent, canActivate:[AuthGuard]},

  {path:"addproduct",component:AddProductComponent, canActivate:[AuthGuard]},
  {path:"allproducts",component:AllProductsComponent, canActivate:[AuthGuard]},
  {path:"product/:id",component:OneProductComponent, canActivate:[AuthGuard]},
  {path:"product/:id/img",component:AddProductImgComponent, canActivate:[AuthGuard]},
  {path:"product/:id/edit",component:EditProductComponent, canActivate:[AuthGuard]},

  {path:"incomingOrders",component:IncomingOrdersComponent, canActivate:[AuthGuard]},
  {path:"acceptedOrders",component:AcceptedOrdersComponent, canActivate:[AuthGuard]},
  {path:"order/:id",component:OneOrderComponent, canActivate:[AuthGuard]},

  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
