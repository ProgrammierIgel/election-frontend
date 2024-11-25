import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DoVoteComponent } from './do-vote/do-vote.component';
import { LoginComponent } from './login/login.component';
import { ShowVotingComponent } from './show-voting/show-voting.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AdminPanelComponent,
    DoVoteComponent,
    LoginComponent,
    RouterOutlet,
    ShowVotingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'election-frontend';
}
