import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddMatchesComponent } from './component/add-matches/add-matches.component';
import { TableMatchesComponent } from './component/table-matches/table-matches.component';
import { AddPlayerComponent } from './component/add-player/add-player.component';
import { AddTeamComponent } from './component/add-team/add-team.component';
import { TableTeamComponent } from './component/table-team/table-team.component';
import { MatchInfoComponent } from './component/match-info/match-info.component';
import { TablePlayerComponent } from './component/table-player/table-player.component';
import { PlayerInfoComponent } from './component/player-info/player-info.component';
import { TeamInfoComponent } from './component/team-info/team-info.component';
import { MatchesComponent } from './component/matches/matches.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"contact",component:ContactComponent},
  {path:"signup",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"add-matches",component:AddMatchesComponent},// http://localhost:4200/add-matches
  {path:"edit-match/:id",component:AddMatchesComponent},
  {path:"table-matches",component:TableMatchesComponent},
  {path:"add-player",component:AddPlayerComponent},
  {path:"edit-player/:id",component:AddPlayerComponent},
  {path:"table-player",component:TablePlayerComponent},
  {path:"add-team",component:AddTeamComponent},
  {path:"edit-team/:id",component:AddTeamComponent},
  {path:"table-team",component:TableTeamComponent},
  {path:"match-info/:idMatch",component:MatchInfoComponent},
  {path:"player-info/:idPlayer",component:PlayerInfoComponent},
  {path:"team-info/:idTeam",component:TeamInfoComponent},
  {path:"matches",component:MatchesComponent},
  {path:"login",component:LoginComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
