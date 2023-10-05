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

  constructor(private fireStoreService: FirestoreService) {

    // this._selectedCharacters.subscribe(data => {
    //   console.log(data)
    //   this.selectedCharactersData$ = this.fireStoreService.characterData$
    //     .pipe(map(arr => (data.map(name => (arr.find(character => character.Name === name)))).filter((character): character is characterType => !!character)))
    // })


  }

  AddCharacter(characterName: string): void {
    this.selectedCharacters.push(characterName);


    // const currentCharacters = this._selectedCharacters.value;
    // if (currentCharacters.length < this.MAXTEAMSIZE) {
    //     this._selectedCharacters.next([...currentCharacters, characterName]);
    // } else {
    //     console.log("Ran out of team space.");
    // }
}

}
