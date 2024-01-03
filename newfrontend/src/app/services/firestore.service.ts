import { Injectable, inject } from '@angular/core';
import { characterType } from '../Models/character.model';
import { Firestore, collectionData, collection, getDoc, doc, addDoc, setDoc, DocumentData, docData} from '@angular/fire/firestore';
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


  saveTeamToDB(path: string, teamData: characterType[][]): void{
    teamData.forEach((team, index) => {
      setDoc(doc(this._fireStore, path, `team${index}`), {...team})
    })
  }
  writeDoc<T>(path: string, data: {}){
    setDoc(doc(this._fireStore, path), data)
  }
  getDoc(path: string): Observable<DocumentData | undefined >{
    return docData(doc(this._fireStore, path))
  }
  getCollectionSubscription(path: string): Observable<DocumentData>{
    const collectionRef = collection(this._fireStore, path)
    return (collectionData(collectionRef))
  }

}
