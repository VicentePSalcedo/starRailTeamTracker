import { Injectable, OnInit } from '@angular/core';
import { characterType, checkData, dataType, ornament, relics } from './Models/character.model';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject, Observable } from 'rxjs';
type EquipmentKey = 'Body' | 'Feet' | 'Sphere' | 'Rope';
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
    this.loadFromCache();
  }

  getAllCharacters() {
    return this._allCharacters;
  }

  addCharacter(characterName: string): void {
    if (this.selectedCharacters.length >= this.MAXTEAMSIZE) return;
    this.selectedCharacters.push(characterName);
    this.filterCharacterList();
    this.saveToCache(this._displayedCharacters.value);
  }
  removeCharacter(characterName: string): void {
    if (this.selectedCharacters.length < 0) return;
    const index = this.selectedCharacters.indexOf(characterName);
    if (index !== -1) {
      this.selectedCharacters.splice(index, 1);
    }
    this.filterCharacterList();
    console.log(this.selectedCharacters);
    this.saveToCache(this._displayedCharacters.value);
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

  // updateDisplayedChecked(test: dataType){
  //   const p = Object.values(Object.values(this._displayedCharacters.value.find(data =>(data.Name == test.CharacterName)) as any)).forEach(d => {console.log(d)})
  //   console.log(this._displayedCharacters.value[0])
  // }
  
  updateChecked(characterName: string, equipmentType: keyof characterType, artifactType: keyof ornament): void {
    const character = this._displayedCharacters.value.find(data => data.Name == characterName)
    if(character && artifactType != "Set" && equipmentType == "Ornament") {
      console.log(character[equipmentType][artifactType])
      console.log(character.  Ornament.        Sphere)
    }
  }

  importIntoDisplayedCharacter(characters: characterType[]): void{
    if(characters.length > this.MAXTEAMSIZE) return;
    this._displayedCharacters.next(characters);
    characters.forEach(data => {
      this.selectedCharacters.push(data.Name);
    })
  }

  loadFromCache(): void{
    const charactersStorage = localStorage.getItem('characters');
    if(!charactersStorage) return;
    this.importIntoDisplayedCharacter(JSON.parse(charactersStorage));
  }

  saveToCache(data: characterType[]): void{
    if(data.length > this.MAXTEAMSIZE) return;
    localStorage.setItem('characters', JSON.stringify(data));
  }
}
