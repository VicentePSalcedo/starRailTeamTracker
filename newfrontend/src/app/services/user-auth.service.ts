import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User, user } from '@angular/fire/auth';
import { Observable, Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  user$: Observable<User | null> = of<null>(null)

  constructor(private _auth: Auth) {
    this.user$ = user(this._auth);
  }

  signInPopUpGoogle(){
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }
  logOut(){
    return signOut(this._auth);
  }
}
