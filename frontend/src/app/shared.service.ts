import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _httpClient: HttpClient) { }

  createPokemonService(submittedPokemon: any) {
    console.log("This console log is from the shared.service.ts. It is specifically from the pokemonService function which is making the request to the backend");
    console.log("This is all the data that was submitted from the form:", submittedPokemon);
    return this._httpClient.post(import.meta.env["BACKEND_URL"] + '/submitPokemon', submittedPokemon)  
  }

}
