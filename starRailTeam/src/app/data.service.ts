import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { characterType } from './Models/character.model';

@Injectable({
  providedIn: 'root'
})
//TODO Make two different services for characterData and selectedData
export class DataService {

  private _selectedCharacters: BehaviorSubject<String[]> = new BehaviorSubject<String[]>(["Kafka", "Silver Wolf"])
  get selectedCharacters$(): Observable<String[]>{
    return this._selectedCharacters.asObservable();
  }

  AddCharacter(characterName: String): void{
    this._selectedCharacters.next([...this._selectedCharacters.value, characterName])
  }



}
