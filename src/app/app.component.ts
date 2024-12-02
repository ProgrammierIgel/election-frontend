import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingService } from './services/routing/routing.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgbModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'election-frontend';

  constructor(private modalService: NgbModal, private router: RoutingService) {
  }

  public async open(modal: any): Promise<void> {
    this.modalService.open(modal);
  }

  public async toLogin():Promise<void> {
    await this.router.toLogin()
    document.location.reload()
    return
  }

  public async toShowVoting():Promise<void> {
    await this.router.toShowVotes()
    document.location.reload()
    return
  }

  public async toMakeVote():Promise<void> {
    await this.router.tovoting();
    document.location.reload()
    return
  }
}
