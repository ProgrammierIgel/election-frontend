import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  async toLogin(): Promise<void>{
    await this.router.navigate(["login"])
    return
  }

  async toAdminPanel(): Promise<void>{
    await this.router.navigate(["adminpanel"])
    return
  }

  async toShowVotes(): Promise<void>{
    await this.router.navigate(["showVotes"])
    return
  }

  async tovoting(): Promise<void>{
    await this.router.navigate(["voting"])
    return
  }
}
