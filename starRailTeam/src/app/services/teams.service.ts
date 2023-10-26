import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { characterType } from '../Models/character.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private _teams: BehaviorSubject<characterType[][]> = new BehaviorSubject<characterType[][]>([[]]);
  teams$ = this._teams.asObservable();
  
  currentTeam = 0;

  constructor(private dataService: DataService) {
    this.dataService.displayedCharacters$.subscribe(data => {
      let newTeam = this._teams.value;
      newTeam[this.currentTeam] = data;
      this._teams.next(newTeam)
      // this._teams.value[this.currentTeam] = data;      
    })

    this._teams.subscribe(data => {
      // this.dataService.saveToCache(this._teams.value)
    })
  }
  //TODO Use this to see if the data coming from the displayedCharacters sub is the same as 
  handleDisplayedSubscription(characters: characterType[]){
  }
  changeTeams(index: number){
    if(index < 0) return;
    if(!this._teams.value[index]){
      this._teams.value[index] = [];
    }
    this.currentTeam = index;
    this.dataService.setDisplayCharacters(this._teams.value[this.currentTeam]);
    
  }
}
