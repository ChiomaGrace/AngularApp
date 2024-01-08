import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _httpClient: HttpClient) { }

  createPokemonService(submittedPokemon: any) {
    console.log("This console log is from the shared.service.ts. It is specifically from the pokemonService function which is making the request to the backend. Here is the data it is trying to send:", submittedPokemon);
    // console.log("Environment variable:", import.meta.env["NG_APP_BACKEND_URL"] )
    return this._httpClient.post(import.meta.env["NG_APP_BACKEND_URL"] + '/submitPokemon', submittedPokemon)  
  }
