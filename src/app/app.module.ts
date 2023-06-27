import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BankaComponent } from './banka/banka.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { Routes, RouterModule } from '@angular/router';
import { FilijalaComponent } from './filijala/filijala.component';
import { UslugaComponent } from './usluga/usluga.component';
import { KorisnikUslugeComponent } from './korisnik-usluge/korisnik-usluge.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BankaService } from './service/banka.service';
import { FilijalaService } from './service/filijala.service';
import { KorisnikUslugeService } from './service/korisnik-usluge.service';
import { UslugaService } from './service/usluga.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { BankaDialogComponent } from './dialog/banka-dialog/banka-dialog.component';
import { FilijalaDialogComponent } from './dialog/filijala-dialog/filijala-dialog.component';
import { KorisnikUslugeDialogComponent } from './dialog/korisnik-usluge-dialog/korisnik-usluge-dialog.component';
import { UslugaDialogComponent } from './dialog/usluga-dialog/usluga-dialog.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/home/home.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

const routes: Routes = [{path: 'home', component:HomeComponent},
                {path: 'banka', component: BankaComponent},
                {path: 'filijala', component: FilijalaComponent},
                {path: 'usluga', component: UslugaComponent},
                {path: 'korisnik_usluge', component: KorisnikUslugeComponent},
                {path: '', redirectTo: '/home', pathMatch: 'full'}        
                ];
             

@NgModule({
  declarations: [
    AppComponent,
    BankaComponent,
    FilijalaComponent,
    KorisnikUslugeComponent,
    UslugaComponent,
    BankaDialogComponent,
    FilijalaDialogComponent,
    KorisnikUslugeDialogComponent,
    UslugaDialogComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
MatExpansionModule,
MatListModule,
MatToolbarModule,
MatFormFieldModule,
MatTableModule,
MatSnackBarModule,
HttpClientModule,
MatInputModule,
MatDatepickerModule,
RouterModule,
MatPaginatorModule,
RouterModule.forRoot(routes),
MatDialogModule,
MatSortModule,
FormsModule,
MatNativeDateModule,
MatCheckboxModule,
MatSelectModule,
MatOptionModule
],
  providers: [{provide: MAT_DATE_LOCALE, useValue:'en-GB'},BankaService,FilijalaService,KorisnikUslugeService,UslugaService],
  bootstrap: [AppComponent]
})
export class AppModule {
  }
