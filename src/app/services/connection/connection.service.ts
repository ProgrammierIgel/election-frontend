import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { host, port } from '../../config.json';
import { Id } from './Id';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(protected http: HttpClient)
  {  }



  async getCandidates(): Promise<getCandidates> {
    return await lastValueFrom(this.http.get<getCandidates>(`${host}:${port}/getCandidates`))
  }

  async getName(): Promise<getName> {
    return await lastValueFrom(this.http.get<getName>(`${host}:${port}/getName`))
  }

  async showVoting(): Promise<showVoting> {
    const showVoting = await lastValueFrom(this.http.get<showVoting>(`${host}:${port}/showVoting`));
    (await this.getCandidates())["candidates"].forEach((candidate: string) => {
      if (!showVoting[candidate]){
        showVoting[candidate] = 0
      }
    });
    return showVoting
  }

  async isVotingActive (): Promise<statusVoting> {
    return await lastValueFrom(this.http.get<statusVoting>(`${host}:${port}/votingActive`))
  }

  async getAllIds(password: string): Promise<getAllIds> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<getAllIds>(`${host}:${port}/getAllIds`, JSON.stringify({password}), {headers: headers}))
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
    headers.set("Access-Control-Allow-Origin", "*")
    const res = await lastValueFrom(this.http.post<status>(`${host}:${port}/insertNewVotable`, JSON.stringify({"password": password, "vote-id": id}), {headers: headers}))

    console.log(res["status"])
  }

  async insertNewCandidate(password: string, candidate: string): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'text/plain');
    headers.set("Access-Control-Allow-Origin", "*");
    const res = await lastValueFrom(this.http.post<status>(`${host}:${port}/addCandidate`, JSON.stringify({"password": password, "candidate": candidate}), {headers: headers}))
    console.log(res["status"])
  }

  async deleteAllEntries(password: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/deleteAll`, JSON.stringify({password}), {headers: headers}))
  }

  async deleteAllVotes(password: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/deleteAllVotes`, JSON.stringify({password}), {headers: headers}))
  }

  async makeVote(id: string, candidate: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/makeVote`, JSON.stringify({id, candidate}), {headers: headers}))
  }

  async deleteCandidate(password: string, candidate: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/removeCandidate`, JSON.stringify({password, candidate}), {headers: headers}))
  }

  async deleteVotable(password: string, vote: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/removeVotable`, JSON.stringify({password, "id": vote}), {headers: headers}))
  }

  async setName(password: string, name: string): Promise<status> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set("Access-Control-Allow-Origin", "*");
    return await lastValueFrom(this.http.post<status>(`${host}:${port}/changeName`, JSON.stringify({password, name}), {headers: headers}))
  }

}

type getCandidates = {
  candidates: string[]
}
type getName = {
  name: string
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

interface getAllIds{
  votes: Id[]
}
