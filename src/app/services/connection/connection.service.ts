import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {host, port} from '../../../config.json'

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(protected http: HttpClient)
  {  }



  async getCandidates(): Promise<getCandidates> {
    return await lastValueFrom(this.http.get<getCandidates>(`${host}:${port}/getCandidates`))
  }

  async showVoting(): Promise<showVoting> {
    return await lastValueFrom(this.http.get<showVoting>(`${host}:${port}/showVoting`))
  }

  async isVotingActive (): Promise<statusVoting> {
    return await lastValueFrom(this.http.get<statusVoting>(`${host}:${port}/votingActive`))
  }

  async activateVoting (password: string): Promise<statusVoting> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<statusVoting>(`${host}:${port}/activateVoting`, JSON.stringify({password}), {headers: headers}))
  }

  async checkPassword(password: string): Promise<password> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<password>(`${host}:${port}/checkPassword`, JSON.stringify({password}), {headers: headers}))
  }

  async deactivateVoting (password: string): Promise<statusVoting> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<statusVoting>(`${host}:${port}/deactivateVoting`, JSON.stringify({password}), {headers: headers}))
  }

  async insertNewVotable(password: string, id: string): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'text/plain');
    headers.set("Access-Control-Allow-Origin", "*");
    const res = await lastValueFrom(this.http.post<status>(`${host}:${port}/insertNewVotable`, JSON.stringify({"password": password, "vote-id": id}), {headers: headers}))
    console.log(res["status"])
  }

  async deleteAllEntries(password: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/deleteAll`, JSON.stringify({password}), {headers: headers}))
  }

  async makeVote(id: string, candidate: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/makeVote`, JSON.stringify({id, candidate}), {headers: headers}))
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
