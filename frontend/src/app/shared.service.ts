import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _httpClient: HttpClient) { }

  createPokemonService(submittedPokemon: any) {
    // console.log("This console log is from the shared.service.ts. It is specifically from the pokemonService function which is making the request to the backend. Here is the data it is trying to send:");
    for (const [key, value] of submittedPokemon) {
      console.log(key, value);
    }
    return this._httpClient.post(import.meta.env["NG_APP_BACKEND_URL"] + '/submitPokemon', submittedPokemon)  
  }

  allPokemonService() {
    // console.log("This is the all Pokemon service that is sending the data from the database model in the backend to the display all Pokemon typescript file.")
    return this._httpClient.get<[]>(import.meta.env["NG_APP_BACKEND_URL"] + '/Pokemon')
  }

  specificPokemonService( id: any ) {
    // console.log("This is the specific Pokemon service that is retrieving one Pokemon from the database model in the backend and sending it to the update Pokemon typescript file using the id from the url.")
    // console.log("Pokemon id:", id);
    return this._httpClient.get<[]>(import.meta.env["NG_APP_BACKEND_URL"] + `/getPokemon/${id}`)
  }

  updatePokemonService(updatePokemon: any, id:any) {
    // console.log("This is the update Pokemon service function which is making the request to the backend. Here is the data it is trying to send to complete the update:")
    // console.log("Pokemon id:", id);
    // console.log("Updated Pokemon Data:", updatePokemon)
    for (const [key, value] of updatePokemon) {
      console.log(key, value);
    }
    return this._httpClient.put(import.meta.env["NG_APP_BACKEND_URL"] + `/updatePokemon/${id}`, updatePokemon)
  }

  deletePokemonService(id: any){
    console.log("This is the delete Pokemon service function which is making the request to the backend. Here is the data it is trying to send to complete the deletion:")
    console.log("Pokemon id:", id);
    return this._httpClient.delete(import.meta.env["NG_APP_BACKEND_URL"] + `/deletePokemon/${id}`)
  }

}
