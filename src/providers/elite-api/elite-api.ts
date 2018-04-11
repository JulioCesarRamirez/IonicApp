import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/observable";
import 'rxjs/add/observable/of'
@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-app-i2-d052d.firebaseio.com'
  private currentTourney: any = {};
  private tourneyData = {};
  constructor(public http: Http) {
   
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));

    })
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
    if(!forceRefresh && this.tourneyData[tourneyId]){
      this.currentTourney = this.tourneyData[tourneyId]
      console.log('**no need to make HTTP call, just return the data');
      return Observable.of(this.currentTourney);
    }
    console.log('**about to make HTTP call');
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .map(response => {
      this.currentTourney = response.json();
      return this.currentTourney;
    } )
  }

  refreshCurrentTourney(){
    return this.getTournamentData(this.currentTourney.tournament.id, true)
  }

  getCurrentTourney(){
    return this.currentTourney;
  }

}
