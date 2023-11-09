import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user!: User | null;
  private _userSubscription$!: Subscription;

  constructor(private userAuth: UserAuthService, private http: HttpClient, private firestore: FirestoreService){}
  createCheckoutSession(){
    if(!this.user) return this.login();
    this.http.post(
      'https://create-checkout-session-h7x52e2twq-uc.a.run.app',
      this.user.uid,
      { responseType:'text'})
      .subscribe( data => window.location.href = data
      );
  }
  login(){
    this.userAuth.signInPopUpGoogle()
  }

  logOut(){
    this.userAuth.logOut();

  }

  newUserCheck(): void{
    
  }

  ngOnInit(): void {
      this._userSubscription$ = this.userAuth.user$.subscribe(data =>{
        this.user = data;
        if(data){
          if(this.firestore.newUserCheck(data.uid)){
            this.firestore.createNewUser(data.uid)
          }
        }
      });
  }

  ngOnDestroy(): void {
      this._userSubscription$.unsubscribe();
  }
}
