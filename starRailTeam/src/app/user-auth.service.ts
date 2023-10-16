import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _auth = inject(Auth);
  user$ = user(this._auth);
  userSub: Subscription;

  constructor() {
    this.userSub = this.user$.subscribe(data => {
      console.log(data)
    })
  }

  signInPopUpGoogle(){
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }
  logOut(){
    return signOut(this._auth);
  }
}
