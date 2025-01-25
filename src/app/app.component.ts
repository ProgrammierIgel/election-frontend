import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingService } from './services/routing/routing.service';
import { ConnectionService } from './services/connection/connection.service';

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
export class AppComponent implements OnInit {
  title = 'election-frontend';
  name = "";

  constructor(private modalService: NgbModal, private router: RoutingService, private ConnectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.updateName()
    setInterval(this.updateName, 10_000)
  }

  public async open(modal: any): Promise<void> {
    this.modalService.open(modal);
  }

  public async toLogin():Promise<void> {
    await this.router.toLogin()
    return
  }

  public async toShowVoting():Promise<void> {
    await this.router.toShowVotes()
    return
  }

  public async toMakeVote():Promise<void> {
    await this.router.tovoting();
    return
  }

  public async updateName():Promise<void> {
    this.name = (await this.ConnectionService.getName())["name"]
    return
  }

}
