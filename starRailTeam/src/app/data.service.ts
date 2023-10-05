import { Injectable, OnInit } from '@angular/core';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService {

  selectedCharactersData$!: characterType[];
  MAXTEAMSIZE: number = 4;
  selectedCharacters: string[] = ["Kafka", "Silver Wolf"]
  displayedCharacters: characterType[] = [];
  private _allCharacters: characterType[] = []

  constructor(private fireStoreService: FirestoreService) {
    this.fireStoreService.characterData$.subscribe(data => {
      this._allCharacters = data;
      this.filterCharacterList()
    })
  }

  AddCharacter(characterName: string): void {
    this.selectedCharacters.push(characterName);
  }

  filterCharacterList() {
    this.displayedCharacters = this._allCharacters.filter(character => (
      this.selectedCharacters.includes(character.Name)
      ));
      console.log(this.displayedCharacters)
      console.log(this._allCharacters)

  }

}
