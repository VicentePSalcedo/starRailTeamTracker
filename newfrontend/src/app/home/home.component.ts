import { Component } from '@angular/core';
import { CardHolderComponent } from '../card-holder/card-holder.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TeamSelectorComponent } from '../team-selector/team-selector.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CardHolderComponent, SidebarComponent, TeamSelectorComponent],
})
export class HomeComponent {

}
