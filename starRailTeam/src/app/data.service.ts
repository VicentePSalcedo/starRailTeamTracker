import { Injectable, OnInit } from '@angular/core';
import { characterType, checkData, dataType, ornament, relics } from './Models/character.model';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
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
      // this.filterCharacterList();
      this.loadFromCache();
    });
  }

  getAllCharacters() {
    return this._allCharacters;
  }

  addCharacter(characterName: string): void {
    if (this._displayedCharacters.value.length >= this.MAXTEAMSIZE || this.checkIfCharacterInTeam(characterName)) return;
    const newDisplayedCharacters = [...this._displayedCharacters.value, this._allCharacters.find(data => data.Name == characterName)]
    this._displayedCharacters.next(newDisplayedCharacters as characterType[])
    this.saveToCache(this._displayedCharacters.value);
  }
  removeCharacter(characterName: string): void {
    if (this._displayedCharacters.value.length < 0 || !this.checkIfCharacterInTeam(characterName)) return;
    const newDisplayedCharacters = this._displayedCharacters.value;
    newDisplayedCharacters.splice(newDisplayedCharacters.findIndex(data => data.Name == characterName), 1)
    this._displayedCharacters.next(newDisplayedCharacters);
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
  checkIfCharacterInTeam(character: string): boolean{
    if(this._displayedCharacters.value.find(data => data.Name == character)) return true;
    return false;
  }
  //TODO clean up a little bit. Assign each "index" to its own variable. Ex: artifact = artifactType as keyof relics
  //Also a bit of dupe code, experiment with the default switch case for this!
  updateChecked(characterName: string, equipmentType: keyof characterType, artifactType: keyof ornament | keyof relics, index: number): void {
    let character: characterType = this._displayedCharacters.value.find(data => data.Name == characterName) as characterType
    if(character && artifactType != "Set") {
      let freshCharacter, checkedCharacter;
      let pushedArray = this._displayedCharacters.value
      switch(equipmentType){
        case "Relics":
          freshCharacter = this.uncheckAll(character[equipmentType][artifactType as keyof relics] as checkData[]);
          checkedCharacter = (character[equipmentType][artifactType as keyof relics][index] as checkData).checked;
          (character[equipmentType][artifactType as keyof relics] as checkData[]) = freshCharacter;
          (character[equipmentType][artifactType as keyof relics] as checkData[])[index].checked = !checkedCharacter;
          pushedArray = this._displayedCharacters.value
          pushedArray.splice(this._displayedCharacters.value.findIndex(d => d.Name == character.Name), 1, character)
          this._displayedCharacters.next(pushedArray)
          this.saveToCache(pushedArray);
          break;
        case "Ornament":
          freshCharacter = this.uncheckAll(character[equipmentType][artifactType as keyof ornament] as checkData[]);
          checkedCharacter = (character[equipmentType][artifactType as keyof ornament][index] as checkData).checked;
          (character[equipmentType][artifactType as keyof ornament] as checkData[]) = freshCharacter;
          (character[equipmentType][artifactType as keyof ornament] as checkData[])[index].checked = !checkedCharacter;
          pushedArray = this._displayedCharacters.value
          pushedArray.splice(this._displayedCharacters.value.findIndex(d => d.Name == character.Name), 1, character)
          this._displayedCharacters.next(pushedArray)
          this.saveToCache(pushedArray);
          break;
        case "LightCone":
          character[equipmentType].checked = !character[equipmentType].checked;
          pushedArray.splice(this._displayedCharacters.value.findIndex(d => d.Name == character.Name), 1, character)
          
          this._displayedCharacters.next(pushedArray)
          this.saveToCache(pushedArray);
          break;

      }
    }
    
  }

  uncheckAll(characterData: checkData[]): checkData[]{
    const testVar = characterData.map(data => ({
      ...data, checked: false
    })); 
    return testVar
  }

  importIntoDisplayedCharacter(characters: characterType[]): void{
    if(characters.length > this.MAXTEAMSIZE) return;
    this._displayedCharacters.next(characters);
    characters.forEach(data => {
      this.selectedCharacters.push(data.Name);
    })
  }

  loadFromCache(): boolean{
    const charactersStorage = localStorage.getItem('characters');
    if(!charactersStorage) return false;
    this.importIntoDisplayedCharacter(JSON.parse(charactersStorage));
    return true
  }

  saveToCache(data: characterType[]): void{
    if(data.length > this.MAXTEAMSIZE) return;
    localStorage.setItem('characters', JSON.stringify(data));
  }
}