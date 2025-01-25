import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';


@Component({
  selector: 'app-show-voting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-voting.component.html',
  styleUrl: './show-voting.component.scss'
})
export class ShowVotingComponent implements OnInit {
  voting: Record<string, number> = {};
  name: string = "";

  constructor(public connection: ConnectionService) {  }

  ngOnInit(){
    this.syncronizeVoting()
    this.updateName()
    setInterval(()=>{
      this.syncronizeVoting()
      this.updateName()

    }, 10_000)
  }

  async syncronizeVoting(): Promise<void>{
    const voting_local = (await this.connection.showVoting())
    voting_local["Noch nicht Abgestimmt"] = voting_local["undefined"]
    delete voting_local['undefined']
    if (voting_local != this.voting){
      this.voting = voting_local
    }
  }

  async updateName(): Promise<void>{
    this.name = (await this.connection.getName())["name"]
  }
}
