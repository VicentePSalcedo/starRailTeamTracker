import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { characterType } from '../Models/character.model';
import { BehaviorSubject } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { User } from 'firebase/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private _teams: BehaviorSubject<characterType[][]> = new BehaviorSubject<characterType[][]>([[]]);
  teams$ = this._teams.asObservable();
  
  currentTeam = 0;

  constructor(private dataService: DataService, private userAuth: UserAuthService, private _firestore: FirestoreService) {
    this.handleCacheLoad();
    this.dataService.displayedCharacters$.subscribe(data => {
      if(data.length == 0) return;
      
      let newTeam = this._teams.value;
      newTeam[this.currentTeam] = data;
      this._teams.next(newTeam)
      // this._teams.value[this.currentTeam] = data;      
    })

    this._teams.subscribe(data => {
      this.dataService.saveToCache(data);
    })

    this.userAuth.user$.subscribe(data => {
      this.handleDatabaseLoad(data)
    })
  }
  handleCacheLoad(){
    const load = this.dataService.loadFromCache();
    console.log(load);
    
    if(load){
      this._teams.next(load);
      this.dataService.setDisplayCharacters(this._teams.value[this.currentTeam]);
    }
  }
  handleDatabaseLoad(user: User | null ){
    if(!user) return
    this._firestore.getCollectionSubscription(`Users/${user.uid}/Teams`).subscribe(data => {
      if((data as []).length == 0) return
      this._teams.next((data as []).map(teamsData => {
        const team = Object.values(teamsData)
        return team as characterType[]}))
      console.log(data);
      
    })
  }
  
  changeTeams(index: number){
    if(index < 0 || index > this.dataService.MAXTEAMSIZE - 1) return;
    if(!this._teams.value[index]){
      this._teams.value[index] = [];
    }
    this.currentTeam = index;
    this.dataService.setDisplayCharacters(this._teams.value[this.currentTeam]);
    
  }

  getTeams(): characterType[][]{
    return this._teams.value
  }

}
