import { WorldMapComponent } from './../../modules/world-map/world-map.component';
import { CountryListComponent } from './../../modules/country-list/country-list.component';
import { MatTableModule } from '@angular/material/table';
import { LineChartComponent } from './../../modules/line-chart/line-chart.component';
import { PieChartComponent } from './../../modules/pie-chart/pie-chart.component';
import { HomeComponent } from './../../modules/home/home.component';
import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './../../modules/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DefaultLayoutComponent } from './default-layout.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { MatSortModule } from '@angular/material/sort';
import { ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import highmaps from "highcharts/modules/map.src";

export function highchartsModules(){
  return [highmaps];
}

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    LoginComponent,
    HomeComponent,
    PieChartComponent,
    LineChartComponent,
    CountryListComponent,
    WorldMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,   
    MatInputModule,
    ChartsModule,
    ChartModule,
    MatSortModule
  ],
  providers: [{ provide : HIGHCHARTS_MODULES , useFactory : highchartsModules}]
})
export class DefaultLayoutModule { }
