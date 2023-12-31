import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FirestoreService } from '../services/firestore.service';
import { TeamsService } from '../services/teams.service';
import { characterType } from '../Models/character.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: User | null;
  teams!: characterType[][]
  isProfileMenuDropped: boolean = false;
  private _userSubscription$!: Subscription;

  constructor(private userAuth: UserAuthService, private http: HttpClient, private firestore: FirestoreService, private teamsService: TeamsService) {
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
    this.userAuth.signInPopUpGoogle()
  }

  logOut() {
    this.userAuth.logOut();

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

  ngOnInit(): void {
    this._userSubscription$ = this.userAuth.user$.subscribe(data => {
      this.user = data;
    });

  }

  ngOnDestroy(): void {
    this._userSubscription$.unsubscribe();
  }
}
