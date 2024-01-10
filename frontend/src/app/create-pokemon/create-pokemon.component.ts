import { Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule, JsonPipe } from "@angular/common";
import { HttpClientJsonpModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { SharedService } from "../shared.service";


@Component({
  selector: 'app-create-pokemon',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, JsonPipe, HttpClientJsonpModule],
  templateUrl: './create-pokemon.component.html',
  styleUrl: './create-pokemon.component.css'
})

export class CreatePokemonComponent {
  
  
  submittedPokemon = {
    'pokemonName': '',
    'pokemonImage': ''
  }
  
  image : any;

  sendingPokemonObservable = {};

  hasFormErrors = false; //Default state of the form errors

  pokemonFormErrors : any; //Where the errors will be stored

  hasSubmittedSuccessfully = false;

  successMessage : any;

  selectImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('pokemonName', this.submittedPokemon.pokemonName);
    formData.append('file', this.image, this.image.name);
    console.log("Image:", this.image, this.image.name);
    // formData.append(`${this.image.name}`, this.image);
    this.sendingPokemonObservable = this._httpService.createPokemonService(formData).subscribe(pokemonData => {
      console.log("Pokemon Data:", pokemonData);
      //@ts-ignore .ts is not happy with 'pokemonData.errors', so I used an ignore here
      if(pokemonData.errors) { //The name 'errors' is the label of the mongoose object containing all the model validation errors
        console.log("This console log means there are errors when the pokemon form attempted to submit, so it was unsuccessful.")
        this.hasFormErrors = true;
        this.pokemonFormErrors = pokemonData;
        console.log("Here are the form errors:", this.pokemonFormErrors.errors);
        console.log("Here is a specific error:", this.pokemonFormErrors.errors.pokemonName.message);
        console.log("Here is a specific error:", this.pokemonFormErrors.errors.pokemonImage.message)  
      }
      else {
        console.log("This console log means the pokemon form submitted succesfully, and this is the Pokemon form data:", pokemonData);
        this.hasSubmittedSuccessfully = true;
        this.successMessage = "Pokemon created successfully!"
        this.submittedPokemon.pokemonName = '';
        this.image = null; 
        this.hasFormErrors = false;
      }
    })
  }
  
  constructor ( private _httpService: SharedService ) {
    
  }

  ngOnInit(): void {

  }
  
}