import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, filter, map } from 'rxjs';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService {

  selectedCharactersData$!: Observable<characterType[]>;

  constructor(private fireStoreService: FirestoreService){

    // this.selectedCharactersData$ = this.fireStoreService.characterData$
    //   .pipe(map(arr => (arr
    //   .filter(character => this._selectedCharacters.value
    //   .includes(character.Name))
    // )))

    this.selectedCharactersData$ = this.fireStoreService.characterData$
    .pipe(map(arr => (this._selectedCharacters.value.map(name => (arr.find(character => character.Name === name)))).filter(character => !!character)))

  }
  private _selectedCharacters: BehaviorSubject<String[]> = new BehaviorSubject<String[]>(["Kafka", "Silver Wolf", "Dan Heng"])
  get selectedCharacters$(): Observable<String[]>{
    return this._selectedCharacters.asObservable();
  }

  AddCharacter(characterName: String): void{
    this._selectedCharacters.next([...this._selectedCharacters.value, characterName])
  }

}
