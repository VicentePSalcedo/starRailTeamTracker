import { Injectable, inject } from '@angular/core';
import { characterType } from '../Models/character.model';
import { Firestore, collectionData, collection, getDoc, doc, addDoc, setDoc, DocumentData} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { TeamsService } from './teams.service';
import { User } from 'firebase/auth';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private _characterData: BehaviorSubject<characterType[]> =
    new BehaviorSubject<characterType[]>([]);
  characterData$: Observable<characterType[]> =
    this._characterData.asObservable();
  private _fireStore: Firestore = inject(Firestore);

  user!: User | null

  constructor() {
    const collectionRef = collection(this._fireStore, 'Characters');
    collectionData(collectionRef).subscribe((data) => {
      this._characterData.next(data as characterType[]);
      // console.log(data)
    });
  }


  writeToDoc(path: string, teamData: characterType[][]): void{
    teamData.forEach((team, index) => {
      // collection(this._fireStore, path)
      setDoc(doc(this._fireStore, path, `team${index}`), {...team})
    })    
    // addDoc(collection(this._fireStore, path), {teamData})
    // doc(this._fireStore, path).
    // teamData.forEach(data => {
    //   addDoc(collection(this._fireStore, path), data)
    // })
  }
  getCollectionSubscription(path: string): Observable<DocumentData>{
    const collectionRef = collection(this._fireStore, path)
    return (collectionData(collectionRef))
  }
}
