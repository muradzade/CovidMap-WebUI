import { WorldMapComponent } from './modules/world-map/world-map.component';
import { CountryListComponent } from './modules/country-list/country-list.component';
import { LineChartComponent } from './modules/line-chart/line-chart.component';
import { PieChartComponent } from './modules/pie-chart/pie-chart.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailsComponent } from './modules/admin/details/details.component';
import { AdminHomeComponent } from './modules/admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path:'',
  component:DefaultLayoutComponent,
  children:[{
    path:'',
    component:HomeComponent
  },{
    path:'login',
    component:LoginComponent
  }]
},{
  canActivate:[AuthGuard],
  path:'admin',
  component:AdminLayoutComponent,
  children:[{
    path:'',
    component:AdminHomeComponent
  },{
    path:'details/:id',
    component:DetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
