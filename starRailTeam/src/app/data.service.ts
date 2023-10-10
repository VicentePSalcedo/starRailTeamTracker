import { Injectable, OnInit } from '@angular/core';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService {

  selectedCharactersData$!: characterType[];
  MAXTEAMSIZE: number = 4;
  selectedCharacters: string[] = ["Kafka", "Dan Heng", "Silver Wolf", "Blade"]
  private _displayedCharacters: BehaviorSubject<characterType[]> = new BehaviorSubject<characterType[]>([]);
  displayedCharacters$ = this._displayedCharacters.asObservable();

  private _allCharacters: characterType[] = [];

  constructor(private fireStoreService: FirestoreService) {
    this.fireStoreService.characterData$.subscribe(data => {
      this._allCharacters = data;
      this.filterCharacterList()
    })
  }

  AddCharacter(characterName: string): void {
    if(this.selectedCharacters.length >= this.MAXTEAMSIZE) return
    this.selectedCharacters.push(characterName);
    this.filterCharacterList();
  }

  filterCharacterList() {
    this._displayedCharacters.next(this.selectedCharacters
      .map(selectedCharacter =>(this._allCharacters
      .find(character => selectedCharacter == character.Name))).filter(Boolean) as characterType[]);

  }

}
