import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DoVoteComponent } from './do-vote/do-vote.component';
import { LoginComponent } from './login/login.component';
import { ShowVotingComponent } from './show-voting/show-voting.component';

export const routes: Routes = [
  {path: "", component: DoVoteComponent},
  {path: "adminpanel", component: AdminPanelComponent},
  {path: "login", component: LoginComponent},
  {path: "showVotes", component: ShowVotingComponent},
  {path: "voting", component: DoVoteComponent}
];
