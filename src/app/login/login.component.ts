import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../services/connection/connection.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { RoutingService } from '../services/routing/routing.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  password=''
  wrongPassword=false
  noPassword=false
  constructor(
    public storage: LocalStorageService,
    public connection: ConnectionService,
    public router: RoutingService)
  {  }

    ngOnInit() {
      this.setup()
    }

  async setup(){
    this.password = ''
    const password_local = this.storage.getItem("password")

    if(password_local === null){
      return
    }
    const correct = (await this.connection.checkPassword(password_local))["correct"]

    if (correct){
      await this.router.toAdminPanel();
      return;
    }
    this.storage.unsetItem('password');
    return

  }

  async check(){

    this.noPassword = false
    this.wrongPassword = false
    if(this.password === '') {
      this.noPassword = true
      return
    }

    const correct = (await this.connection.checkPassword(this.password))["correct"]

    if (correct){
      this.storage.setItem("password", this.password)
      await this.router.toAdminPanel()
      return
    }
    this.wrongPassword = true
    this.password = ''

    return
  }
}
