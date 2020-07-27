import { AddUpdateComponent } from './../../modules/admin/add-update/add-update.component';
import { DetailsComponent } from './../../modules/admin/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './../../modules/admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './../../layouts/admin-layout/admin-layout.component';
import { SharedModule } from './../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHomeComponent,
    DetailsComponent,
    AddUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatMenuModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AdminLayoutModule { }
