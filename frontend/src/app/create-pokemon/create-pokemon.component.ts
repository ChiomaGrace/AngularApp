import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-pokemon',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, JsonPipe, HttpClientModule,],
  templateUrl: './create-pokemon.component.html',
  styleUrl: './create-pokemon.component.css'
})

export class CreatePokemonComponent {

  submittedPokemon: any = {
    'pokemonName': '',
    'pokemonImage': '', 
  }

  sendingPokemonObservable = {};

  constructor ( private _httpService: SharedService ) {
    
  }
  
  submitPokemonForm() {
    console.log("The form has been submitted.")
    this.sendingPokemonObservable = this._httpService.createPokemonService(this.submittedPokemon);
    console.log("The observable has been created, and here is the data its carrying:", this.submittedPokemon);

  }
  
}