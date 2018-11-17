import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MovieItemsComponent } from './movie-items/movie-items.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
