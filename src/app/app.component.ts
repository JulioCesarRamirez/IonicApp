import { TeamHomePage } from './../pages/team-home/team-home';
import { EliteApi } from './../providers/elite-api/elite-api';
import { UserSettings } from './../providers/user-settings/user-settings';

import { TournamenstPage } from './../pages/tournamenst/tournamenst';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from "../pages/my-teams/my-team";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    private userSettings: UserSettings,
    private loadingController: LoadingController,
    private eliteApi: EliteApi,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
   
      this.splashScreen.hide();
      this.userSettings.ionicStorage().then(() => this.rootPage = MyTeamsPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // refreshFavorites(){
  //   this.favoriteTeams = this.userSettings.getAllFavorites();
  // }

  goHome(){
    this.nav.push(MyTeamsPage);
  }
  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    console.log(favorite)
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team))
  }
  goToTournaments(){
    this.nav.push(TournamenstPage);
  }
}