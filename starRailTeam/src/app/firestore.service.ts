import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { characterType } from './Models/character.model';
import { initializeApp } from "firebase/app";
import { Firestore, collection, getFirestore, getDocs, DocumentData, QueryDocumentSnapshot} from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  db: Firestore;
  snapshot: any[] = [];
  constructor() {
    console.log("test");
    const key = {
      apiKey: "AIzaSyBtUTedlwiEr_vQYrXVzXy3rkSj78kj-II",
      authDomain: "starrailteamtracker.firebaseapp.com",
      databaseURL: "https://starrailteamtracker-default-rtdb.firebaseio.com",
      projectId: "starrailteamtracker",
      storageBucket: "starrailteamtracker.appspot.com",
      messagingSenderId: "851893191654",
      appId: "1:851893191654:web:f027228e8255bc24324c27",
      measurementId: "G-2LTS3TFENF"
    };
    const _app = initializeApp(key);
    this.db = getFirestore(_app);

    this.getSnapShot();
    
  }
  async getSnapShot(){
    const snapShot = await getDocs(collection(this.db, "Characters"));
     this.snapshot = snapShot.docs.map(data => (
      data.data()
    ));
  }


  private _snapshotData: BehaviorSubject<characterType[]> = new BehaviorSubject<characterType[]>([]);
  get snapshotData$(): Observable<characterType[]>{
    return this._snapshotData.asObservable();
  }
}
