import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MainComponent } from './main/main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageEnlargeDialogComponent } from './dialogs/image-enlarge-dialog/image-enlarge-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ImageEnlargeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
