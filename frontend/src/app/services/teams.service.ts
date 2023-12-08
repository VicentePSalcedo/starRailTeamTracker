import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { characterType } from '../Models/character.model';
import { BehaviorSubject, skip, take } from 'rxjs';
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
    this.dataService.displayedCharacters$.pipe(
      skip(1)
    ).subscribe(data => {      
      let newTeam = this._teams.value;
      newTeam[this.currentTeam] = data;
      this._teams.next(newTeam)
      // this._teams.value[this.currentTeam] = data;      
    })
    
    //SKIP THE FIRST DATA EMITION FOR TEAMS DATA
    this._teams.pipe(skip(1)).subscribe(data => {
      this.dataService.saveToCache(data);
      this      
    })
    
    this.userAuth.user$.subscribe(data => {
      this.handleDatabaseLoad(data)
    })
    // this.dataService.addCharacter("Asta")
  }
  
  handleCacheLoad(){
    const load = this.dataService.loadFromCache();    
    if(load){
      this._teams.next(load);
      //PUT THIS INTO A NEW FUNCTION, AND HAVE ON TEAMS CHANGE CALL IT.
      this.dataService.setDisplayCharacters(this._teams.value[this.currentTeam]);
    }
  }
  handleDatabaseLoad(user: User | null ){
    if(!user) return
    let firebseTeamData: characterType[][];
    this._firestore.getCollectionSubscription(`Users/${user.uid}/Teams`).subscribe(data => {
      if((data as []).length == 0) return
      firebseTeamData = ((data as []).map(teamsData => {
        const team = Object.values(teamsData)
        return team as characterType[]}))
      
      })
    this._firestore.getDoc(`Users/${user.uid}/Metadata/timestamp`).pipe(take(1)).subscribe(data => {
      if(!data) return
        const timestamp = data["timestamp"]        
        if(Number(timestamp) > this.dataService.savedTimestamp){
          this._teams.next(firebseTeamData)
          this.dataService.setDisplayCharacters(this._teams.value[this.currentTeam])
        }
             
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
