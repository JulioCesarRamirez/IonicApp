import { UserSettings } from './../../providers/user-settings/user-settings';
import { GamePage } from './../game/game';
import { EliteApi } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import moment from "moment";
import * as _ from 'lodash';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team: any = {};
  public dateFilter: string;
  public games: any[];
  private tourneyData: any;
  public teamStanding: any = {};
  public allGames: any[];
  public useDateFilter = false;
  public isFollowing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userSettings: UserSettings,
    private alertController: AlertController,
    private toastController: ToastController,
    private eliteApi: EliteApi
  ) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        }
      })
      .value();
    this.allGames = this.games;

    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
    this.userSettings.isFavoriteTeam(this.team.id.toString()).then(value => this.isFollowing = value);

  }
  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }
  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W: ') === 0 ? 'primary' : 'danger';
  }

  toggleFollow(){
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'are you sure you want to unfollow?',
        buttons: [
          {
            text:'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unFavoriteTeam(this.team);

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {text: 'No'}
        ]
      });
      confirm.present();
    }else{
      this.isFollowing = true;
      this.userSettings.favoriteTeam(this.team, this.tourneyData.tournament.id,
      this.tourneyData.tournament.name);
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }
}