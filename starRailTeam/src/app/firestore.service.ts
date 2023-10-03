import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { characterType } from './Models/character.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private _fireStore: Firestore = inject(Firestore);
  private _characterData$: Observable<characterType[]>;

  get characterData$(): Observable<characterType[]>{
    return this._characterData$;
  }

  constructor(){
    const collectionRef = collection(this._fireStore, 'Characters');
    this._characterData$ = collectionData(collectionRef) as Observable<characterType[]>;
  }
}
