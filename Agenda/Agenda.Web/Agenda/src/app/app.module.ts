import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './navigation/nav-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditContactDialog } from './dialog/edit-contact-dialog';
import { NewContactDialog } from './dialog/new-contact-dialog';
import { DatabaseModule } from './_databse/database-module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    EditContactDialog,
    NewContactDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatabaseModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule
  ],
  entryComponents: [
    EditContactDialog,
    NewContactDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
