import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureComponent } from './components/feature-list/feature/feature.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchComponent } from './components/search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from './components/table/table.component';
import { CrudComponent } from './components/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    FeatureComponent,
    FeatureListComponent,
    SearchComponent,
    TableComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    HttpClientModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
