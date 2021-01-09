import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { CartComponent } from './pages/orders/cart/cart.component';
import { OrderComponent } from './pages/orders/order/order.component';
import { ProductCategoryComponent } from './pages/products/product-category/product-category.component';
import { ProductComponent } from './pages/products/product/product.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { RegisterComponent } from './shared/auth/register/register.component';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"products/:cat",component:ProductCategoryComponent},
  {path:"product/:id",component:ProductComponent},
  {path:"cart",component:CartComponent , canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent , canActivate:[AuthGuard]},
  {path:"order/:id",component:OrderComponent , canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent, canActivate:[NotAuthGuard]},
  {path:"register",component:RegisterComponent, canActivate:[NotAuthGuard]},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
