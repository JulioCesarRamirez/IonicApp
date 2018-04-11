import { MyTeamsPage } from './../my-teams/my-team';
import { StandingsPage } from './../standings/standings';
import { TeamDetailPage } from './../team-detail/team-detail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  public teamDetailTap = TeamDetailPage;
  public standingsTap = StandingsPage;
  public team: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log('**navbar params', this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }
  goHome(){
    // this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }
}
