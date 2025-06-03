import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './modules/country/country.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MatchStatsComponent } from './modules/match-stats/match-stats.component';
import { MatchComponent } from './modules/match/match.component';
import { PlayerComponent } from './modules/player/player.component';
import { SeasonComponent } from './modules/season/season.component';
import { SquadComponent } from './modules/squad/squad.component';
import { StadiumComponent } from './modules/stadium/stadium.component';
import { TeamsComponent } from './modules/teams/teams.component';
import { TournamentComponent } from './modules/tournament/tournament.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/authguard.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'match-stat', component: MatchStatsComponent },
      { path: 'country', component: CountryComponent },
      { path: 'stadium', component: StadiumComponent },
      { path: 'season', component: SeasonComponent },
      { path: 'tournament', component: TournamentComponent },
      { path: 'team', component: TeamsComponent },
      { path: 'player', component: PlayerComponent },
      { path: 'squad', component: SquadComponent },
      { path: 'match', component: MatchComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
