import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user!: User | null;
  private _userSubscription$!: Subscription;

  constructor(private userAuth: UserAuthService){}
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
