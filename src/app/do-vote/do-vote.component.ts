import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../services/connection/connection.service';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-do-vote',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './do-vote.component.html',
  styleUrl: './do-vote.component.scss'
})
export class DoVoteComponent implements OnInit {
  candidates:string[] = []
  id: string = ''
  name: string = ''

  ngOnInit(){
    this.updateName()
    this.syncCandidates()
    setInterval(()=>{
      this.updateName()
      this.syncCandidates()
    }, 60_000)
  }

  constructor(public connect: ConnectionService, public routing: RoutingService) {}

  async syncCandidates(){
    const local_candidates = (await this.connect.getCandidates())['candidates']
    if(local_candidates.indexOf('undefined')<0) {
      return
    }

    local_candidates.splice(local_candidates.indexOf('undefined'),1)
    if(local_candidates !== this.candidates){
      this.candidates = local_candidates
    }
  }

  async submit(): Promise<void> {
    if (this.id == '') {
      return
    }

    if (!(await this.connect.isVotingActive())["statusVoting"]){
      alert("No Voting active")
      return
    }
    for (let i of this.candidates) {
    	  if(document.forms[0][i].checked){
          try{
            await this.connect.makeVote(this.id, i)
          }
          catch(e) {
            alert("An error occurred! Try again")

            this.id = ''
            return
          }
          this.routing.toShowVotes()
          return
        }
      }
      alert("NOTHING SELECTED")

  }

  async updateName(): Promise<void>{
    this.name = (await this.connect.getName())["name"];
    console.log(this.name)
  }
}
