import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/siderbar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MatchStatsComponent } from './modules/match-stats/match-stats.component';
import { TournamentComponent } from './modules/tournament/tournament.component';
import { SquadComponent } from './modules/squad/squad.component';
import { PlayerComponent } from './modules/player/player.component';
import { MatchComponent } from './modules/match/match.component';
import { SeasonComponent } from './modules/season/season.component';
import { TeamsComponent } from './modules/teams/teams.component';
import { StadiumComponent } from './modules/stadium/stadium.component';
import { CountryService } from './core/services/country/country.service';
import { CountryComponent } from './modules/country/country.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './core/services/loader/loader.service';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './auth/login/login.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    MatchStatsComponent,
    TournamentComponent,
    SquadComponent,
    PlayerComponent,
    MatchComponent,
    SeasonComponent,
    TeamsComponent,
    StadiumComponent,
    CountryComponent,
    LoaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      autoDismiss: true,
      newestOnTop: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    SelectDropDownModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [
    CountryService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
