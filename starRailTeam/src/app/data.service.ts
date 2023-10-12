import { Injectable, OnInit } from '@angular/core';
import { characterType } from './Models/character.model';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//TODO Make two different services for characterData and selectedData
export class DataService {
  // Remeber to use this variable and not displayed character in card-holder
  // --- --- ---
  selectedCharactersData$!: characterType[];
  // --- --- ---
  MAXTEAMSIZE: number = 4;
  selectedCharacters: string[] = [];
  private _displayedCharacters: BehaviorSubject<characterType[]> =
    new BehaviorSubject<characterType[]>([]);
  displayedCharacters$ = this._displayedCharacters.asObservable();

  private _allCharacters: characterType[] = [];

  constructor(private fireStoreService: FirestoreService) {
    this.fireStoreService.characterData$.subscribe((data) => {
      this._allCharacters = data;
      this.filterCharacterList();
    });
  }

  getAllCharacters() {
    return this._allCharacters;
  }

  addCharacter(characterName: string): void {
    if (this.selectedCharacters.length >= this.MAXTEAMSIZE) return;
    this.selectedCharacters.push(characterName);
    this.filterCharacterList();
  }
  removeCharacter(characterName: string): void {
    if (this.selectedCharacters.length < 0) return;
    const index = this.selectedCharacters.indexOf(characterName);
    if (index !== -1) {
      this.selectedCharacters.splice(index, 1);
    }
    this.filterCharacterList();
    console.log(this.selectedCharacters);
  }

  filterCharacterList() {
    this._displayedCharacters.next(
      this.selectedCharacters
        .map((selectedCharacter) =>
          this._allCharacters.find(
            (character) => selectedCharacter == character.Name,
          ),
        )
        .filter(Boolean) as characterType[],
    );
  }
}
