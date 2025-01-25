import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../services/connection/connection.service';
import { Id } from '../services/connection/Id';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  onShowElection() {
    this.routerService.toShowVotes()
    return
  }

  onElection() {
    this.routerService.tovoting()
    return
  }

  candidates: string[];
  currentName: string;
  newName = ''
  voting: Record<string, number>;
  status: boolean
  votable = ''
  candidate = ''
  allIds: Id[] = []
  constructor(public routerService: RoutingService, public connectionService: ConnectionService, public storage: LocalStorageService){
    this.status = false;
    this.candidates = []
    this.voting = {};
    this.currentName = '';
   }

   async updateName(): Promise<void> {
    this.currentName = (await this.connectionService.getName())["name"]
   }

   async setNewName(): Promise<void>{
    // TODO: auslagern in Funktion
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }

    if (this.newName == ""){
      return
    }

    await this.updateName()

    if(this.newName == this.currentName){
      this.newName = ""
      return
    }

    await this.connectionService.setName(password, this.newName)
    await this.updateName()
    this.newName = ""

   }

   async checkPassword(password: string): Promise<boolean> {
    return (await this.connectionService.checkPassword(password))['correct'];
   }

   async onLogout(){
    this.storage.unsetItem('password')
    this.routerService.toLogin()
    return
   }

   async updateCandidates(): Promise<void> {
    // Check password
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }


    await this.updateStatus()

    const candidates = (await this.connectionService.getCandidates())['candidates']
    const voting = await this.connectionService.showVoting()

    this.candidates = candidates
    this.voting = voting
   }



   async updateListItems(): Promise<void> {
    // Check password
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    await this.updateStatus()
    const allIds = (await this.connectionService.getAllIds(password))['votes']
    this.allIds = allIds
  }

  async onDeleteVotable(id: string): Promise<void> {
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    const shure = await window.confirm(`Bist du sicher, dass du "${id}" löschen möchtest`);

    if (!shure){
      return
    }
    await this.connectionService.deleteVotable(password, id)
    await this.updateListItems()
    return
   }

  async onDeleteCandidates(candidate: string): Promise<void> {
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    const shure = await window.confirm(`Bist du sicher, dass du "${candidate}" löschen möchtest`);

    if (!shure){
      return
    }
    await this.connectionService.deleteCandidate(password, candidate)
    await this.updateCandidates();
    return
   }

   ngOnInit(): void{
    this.routeToLogin(this.storage.getItem('password'))
    this.updateStatus()
    this.updateListItems()
    this.updateName()
    this.updateCandidates()

   }

   async routeToLogin(password: string | null): Promise<boolean> {
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return false
    }
    return true
   }

   async updateStatus(): Promise<void>{
      this.status = (await this.connectionService.isVotingActive())['statusVoting'];
   }

  async onAddNewVotable(): Promise<void> {
    if (this.votable === '') {
      return;
    }

    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    try {
      await this.connectionService.insertNewVotable(password, this.votable)
    }catch(e){
      if (e instanceof HttpErrorResponse){
        if (e.error == "votable already exists\n"){
          alert("The Votable already exists")
          this.votable='';
          return
        }
      }
    }

    this.votable='';
    this.updateListItems()
  }

  async onAddNewCandidate(): Promise<void> {
    if (this.candidate === '') {
      return;
    }

    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    try{
      await this.connectionService.insertNewCandidate(password, this.candidate)
    } catch(e){
      if (e instanceof HttpErrorResponse){
        if (e.error == "candidate already exists\n"){
          alert("The Candidate already exists")
          this.candidate='';
          return
        }
        if (e.error == "candidate already exists\n"){
          alert("The voting is already active! Please deactivate the voting")
          this.candidate='';
          return
        }
      }
    }

    this.candidate='';
    this.updateCandidates()
  }

   async onActivateVoting(): Promise<void> {
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    await this.updateStatus()
    if (this.status == true){
      alert('Already active')
      return
    }
    await this.connectionService.activateVoting(password)
    await this.updateStatus()
    this.updateListItems()
    this.updateCandidates()
   }

   async onDeactivateVoting(): Promise<void> {
    if (this.status == false){
      alert('Already inactive')
      return
    }
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    await this.connectionService.deactivateVoting(password)
    await this.updateStatus()
    await this.updateListItems()
    await this.updateCandidates()
   }

   async onDeleteAll (): Promise<void>{
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      this.routerService.toLogin()
      return
    }
    const shure = confirm("Bist du sicher, dass du alles löschen möchtest?")
    if (!shure){
      return
    }
    this.connectionService.deleteAllEntries(password).then(()=>{
      this.updateStatus()
      this.updateCandidates()
      this.updateListItems()
    })
  }

  async onDeleteAllVotes (): Promise<void>{
    const password = this.storage.getItem('password')
    if(password == null || !(await this.checkPassword(password))) {
      this.routerService.toLogin()
      return
    }
    const shure = confirm("Bist du sicher, dass du alle Votes löschen möchtest?")
    if (!shure){
      return
    }
    this.connectionService.deleteAllVotes(password).then(()=>{
      this.updateStatus()
      this.updateCandidates()
      this.updateListItems()
    })
  }


}
