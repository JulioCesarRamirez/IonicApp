import { MapPage } from './../pages/map/map';
import { TeamHomePage } from './../pages/team-home/team-home';
import { StandingsPage } from './../pages/standings/standings';
import { TournamenstPage } from './../pages/tournamenst/tournamenst';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TeamsPage } from './../pages/teams/teams';
import { GamePage } from './../pages/game/game';
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from "@agm/core";
import { MyApp } from './app.component';
import { MyTeamsPage } from './../pages/my-teams/my-team';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EliteApi } from '../providers/elite-api/elite-api';
import { HttpModule } from '@angular/http';
import { UserSettings } from '../providers/user-settings/user-settings';
import { SQLite } from "@ionic-native/sqlite";
import { SqlStorage } from '../providers/sql-storage/sql-storage';
@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    MapPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamenstPage, 
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB04fJD4oJ0fGflW284L7GbAdvZPWFe7zA'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    MapPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamenstPage, 
    StandingsPage,
    TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EliteApi,
    UserSettings,
    SqlStorage
  ]
})
export class AppModule { }
