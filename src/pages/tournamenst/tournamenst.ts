import { EliteApi } from './../../providers/elite-api/elite-api';
import { TeamsPage } from './../teams/teams';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-tournamenst',
  templateUrl: 'tournamenst.html',
})
export class TournamenstPage {

  public tournaments: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data
        loader.dismiss();
      });
    })
  }
  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }
}
