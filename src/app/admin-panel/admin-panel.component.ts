import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../services/connection/connection.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule],
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

  status: boolean
  votable = ''
  constructor(public routerService: RoutingService, public connectionService: ConnectionService, public storage: LocalStorageService){
    this.status = false
   }

   async checkPassword(password: string): Promise<boolean> {
    return (await this.connectionService.checkPassword(password))["correct"];
   }

   async onLogout(){
    this.storage.unsetItem('password')
    this.routerService.toLogin()
    return
   }
   ngOnInit(): void{
    this.routeToLogin(this.storage.getItem('password'))
    this.updateStatus()
   }

   async routeToLogin(password: string | null): Promise<boolean> {
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return false
    }
    return true
   }

   async updateStatus(): Promise<void>{
      this.status = (await this.connectionService.isVotingActive())["statusVoting"]
   }

  async onAddNewVotable(): Promise<void> {
    if (this.votable === '') {
      return;
    }

    const password = this.storage.getItem("password")
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }

    this.connectionService.insertNewVotable(password, this.votable)

    this.votable='';
  }

   async onActivateVoting(): Promise<void> {
    const password = this.storage.getItem("password")
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    await this.connectionService.activateVoting(password)
    await this.updateStatus()
   }

   async onDeactivateVoting(): Promise<void> {
    if (this.status == false){
      alert("Already inactive")
      return
    }
    const password = this.storage.getItem("password")
    if(password == null || !(await this.checkPassword(password))) {
      await this.routerService.toLogin()
      return
    }
    await this.connectionService.deactivateVoting(password)
    await this.updateStatus()
   }

   async onDeleteAll (): Promise<void>{
    const password = this.storage.getItem("password")
    if(password == null || !(await this.checkPassword(password))) {
      this.routerService.toLogin()
      return
    }
    this.connectionService.deleteAllEntries(password).then(()=>{
      this.updateStatus()
    })
  }


}
