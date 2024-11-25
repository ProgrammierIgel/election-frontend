import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(protected http: HttpClient)
  {  }



  async getCandidates(): Promise<getCandidates> {
    return await lastValueFrom(this.http.get<getCandidates>(`http://localhost:3000/getCandidates`))
  }

  async showVoting(): Promise<showVoting> {
    return await lastValueFrom(this.http.get<showVoting>(`http://localhost:3000/showVoting`))
  }

  async isVotingActive (): Promise<statusVoting> {
    return await lastValueFrom(this.http.get<statusVoting>(`http://localhost:3000/votingActive`))
  }

  async activateVoting (password: string): Promise<statusVoting> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<statusVoting>(`http://localhost:3000/activateVoting`, JSON.stringify({password}), {headers: headers}))
  }

  async checkPassword(password: string): Promise<password> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<password>(`http://localhost:3000/checkPassword`, JSON.stringify({password}), {headers: headers}))
  }

  async deactivateVoting (password: string): Promise<statusVoting> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<statusVoting>(`http://localhost:3000/deactivateVoting`, JSON.stringify({password}), {headers: headers}))
  }

  async insertNewVotable(password: string, id: string): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'text/plain');
    headers.set("Access-Control-Allow-Origin", "*");
    const res = await lastValueFrom(this.http.post<status>(`http://localhost:3000/insertNewVotable`, JSON.stringify({"password": password, "vote-id": id}), {headers: headers}))
    console.log(res["status"])
  }

  async deleteAllEntries(password: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`http://localhost:3000/deleteAll`, JSON.stringify({password}), {headers: headers}))
  }

  async makeVote(id: string, candidate: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`http://localhost:3000/makeVote`, JSON.stringify({id, candidate}), {headers: headers}))
  }

}

type getCandidates = {
  candidates: string[]
}

type showVoting = Record<string, number>

type statusVoting = {
  statusVoting: boolean
}
type status = {
  status: string
}

type password = {
  correct: boolean
}
