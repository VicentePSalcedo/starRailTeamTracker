import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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
    if(!this.user) return this.login();
    this.http.post(
      'http://127.0.0.1:5001/starrailteamtracker/us-central1/create_checkout_session', this.user.uid, {responseType: "text"})
      .subscribe( data => console.log(data)
      );
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
