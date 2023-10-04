import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, filter, map, take } from 'rxjs';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService {

  selectedCharactersData$!: Observable<characterType[]>;
  MAXTEAMSIZE: number = 4;

  constructor(private fireStoreService: FirestoreService) {

    this._selectedCharacters.subscribe(data => {
      console.log(data)
      this.selectedCharactersData$ = this.fireStoreService.characterData$
        .pipe(map(arr => (data.map(name => (arr.find(character => character.Name === name)))).filter((character): character is characterType => !!character)))
    })


  }
  private _selectedCharacters: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  get selectedCharacters$(): Observable<string[]> {
    return this._selectedCharacters.asObservable();
  }

  AddCharacter(characterName: string): void {
    this.selectedCharactersData$.pipe(
      take(1)
    ).subscribe(characters => {
      if(characters.length < this.MAXTEAMSIZE){
        console.log(characters)
        this._selectedCharacters.next([...this._selectedCharacters.value, characterName])
      }else{
        console.log("Ran out of team space.")
      }
    })
  }

}
