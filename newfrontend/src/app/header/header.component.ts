import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { Observable, Subscription, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FirestoreService } from '../services/firestore.service';
import { TeamsService } from '../services/teams.service';
import { characterType } from '../Models/character.model';
import { environment } from '../../environments/environment';
import { NgClass} from '@angular/common';
import { Auth, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgClass],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: User | null;
  teams!: characterType[][]
  isProfileMenuDropped: boolean = false;
  private _userSubscription$!: Subscription;

  user$: Observable<User | null> = of<null>(null)

  constructor(private http: HttpClient, private firestore: FirestoreService, private teamsService: TeamsService, private _auth: Auth) {
    this.user$ = user(this._auth);

    this.teamsService.teams$.subscribe(data => {
      this.teams = data
    })

  }
  createCheckoutSession() {
    if (!this.user) return this.login();
    this.http.post(
      environment.checkoutSessionUrl,
      this.user.uid,
      { responseType: 'text' })
      .subscribe(data => window.location.href = data
      );
  }
  login() {
    this.signInPopUpGoogle()
  }

  save(){
    if(!this.user) return;
    const userID = this.user.uid
    this.firestore.saveTeamToDB(`Users/${userID}/Teams`, this.teams)
    this.firestore.writeDoc(`Users/${userID}/Metadata/timestamp`, {"timestamp": Date.now().toString()})
  }

  showProfileDropdown(event: Event){
    this.isProfileMenuDropped = !this.isProfileMenuDropped;
  }
  manageSubscription(){
    window.location.href = 'https://billing.stripe.com/p/login/7sIcQwfQO03benCbII'
  }
  signInPopUpGoogle(){
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }
  logOut(){
    return signOut(this._auth);
  }

  ngOnInit(): void {
    this._userSubscription$ = this.user$.subscribe((data: (User | null)) => {
      this.user = data;
    });

  }

  ngOnDestroy(): void {
    this._userSubscription$.unsubscribe();
  }
}
