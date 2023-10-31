import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user!: User | null;
  private _userSubscription$!: Subscription;

  constructor(private userAuth: UserAuthService, private http: HttpClient){}
  createCheckoutSession(){
    this.http.post('http://127.0.0.1:5001/starrailteamtracker/us-central1/create_checkout_session', 'post from starRail app', { responseType:'text'}).subscribe( data => window.location.href = data);
  }
  login(){
    this.userAuth.signInPopUpGoogle()
  }

  logOut(){
    this.userAuth.logOut();

  }

  ngOnInit(): void {
      this._userSubscription$ = this.userAuth.user$.subscribe(data =>{
        this.user = data;
      });
  }

  ngOnDestroy(): void {
      this._userSubscription$.unsubscribe();
  }
}
