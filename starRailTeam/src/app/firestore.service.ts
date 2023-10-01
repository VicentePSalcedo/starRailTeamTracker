import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { characterType } from './Models/character.model';
import { initializeApp } from "firebase/app";
import { Firestore, collection, getFirestore, getDocs, query, getDoc, CollectionReference, DocumentData, Query} from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  db: Firestore;
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

    const characterData = this.getSnapShot();
    console.log(characterData);
    
  }
  async getSnapShot(){
    const snapShot = await getDocs(query(collection(this.db, "Characters")));
    snapShot.forEach(doc =>{
      console.log(`${doc.id} ${doc.data()['Artifacts']['Rope'][0]}`)
    })
    return snapShot;
  }


  private _character: BehaviorSubject<characterType[]> = new BehaviorSubject<characterType[]>([]);
  get character$(): Observable<characterType[]>{
    return this._character.asObservable();
  }
}
