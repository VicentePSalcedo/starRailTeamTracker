import { Injectable, inject } from '@angular/core';
import { characterType } from './Models/character.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private _characterData: BehaviorSubject<characterType[]> =
    new BehaviorSubject<characterType[]>([]);
  characterData$: Observable<characterType[]> =
    this._characterData.asObservable();
  private _fireStore: Firestore = inject(Firestore);

  constructor() {
    const collectionRef = collection(this._fireStore, 'Characters');
    collectionData(collectionRef).subscribe((data) => {
      this._characterData.next(data as characterType[]);
      // console.log(data)
    });
  }
}
