import { Component, inject } from '@angular/core';
import { AppCheck } from '@angular/fire/app-check';

@Component({
  selector: 'app-appcheck',
  templateUrl: './appcheck.component.html',
  styleUrls: ['./appcheck.component.scss']
})
export class AppcheckComponent {
  constructor(private appCheck: AppCheck){
  }
  // async newToken(){
  //   const token = await this.appCheck.
  // }
}
