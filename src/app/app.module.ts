import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactComponent } from './component/contact/contact.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddMatchesComponent } from './component/add-matches/add-matches.component';
import { TableMatchesComponent } from './component/table-matches/table-matches.component';
import { AddPlayerComponent } from './component/add-player/add-player.component';
import { TablePlayerComponent } from './component/table-player/table-player.component';
import { AddTeamComponent } from './component/add-team/add-team.component';
import { TableTeamComponent } from './component/table-team/table-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchInfoComponent } from './component/match-info/match-info.component';
import { PlayerInfoComponent } from './component/player-info/player-info.component';
import { TeamInfoComponent } from './component/team-info/team-info.component';
import { MatchComponent } from './component/match/match.component';
import { MatchesComponent } from './component/matches/matches.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { BannerComponent } from './component/banner/banner.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { ReplaceVowelsPipe } from './pipes/replace-vowels.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContactComponent,
    SignupComponent,
    AddMatchesComponent,
    TableMatchesComponent,
    AddPlayerComponent,
    TablePlayerComponent,
    AddTeamComponent,
    TableTeamComponent,
    MatchInfoComponent,
    PlayerInfoComponent,
    TeamInfoComponent,
    MatchComponent,
    MatchesComponent,
    ReversePipe,
    BannerComponent,
    MyFilterPipe,
    ReplaceVowelsPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
