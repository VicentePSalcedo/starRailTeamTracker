import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loadingCharacters: number = 30;
  arrayOfLoading: undefined[] = Array(this.loadingCharacters) 

}
