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

 @ViewChild( 'fileInput') 

 fileInput : any;

  submittedPokemon = {
    'pokemonName': '',
    'pokemonImage': ''
  }
 
  pokemonName: string = '';
  pokemonImage: any;

  getPokemonName(pokemonName: string) {
    this.pokemonName = pokemonName;
    console.log("Pokemon Name:", this.pokemonName);
  }

  getPokemonImage(event: any) {
    this.pokemonImage = event.target.files[0];
    console.log("Pokemon Image:", this.pokemonImage);
  }

  submitPokemonForm() {
    // const formDataObject = new FormData();
    // formDataObject.set("pokemonName", this.pokemonName);
    // formDataObject.set("pokemonImage", this.pokemonImage);
    // console.log("This is the form data:");
    // for (const [key, value] of formDataObject) {
    //   console.log(key, value);
    // }
    this.sendingPokemonObservable = this._httpService.createPokemonService(this.submittedPokemon).subscribe(pokemonData => {
      console.log("This is the form data submitted via the form after being subscribed to:", pokemonData)
      //@ts-ignore .ts is not happy with 'pokemonData.errors', so I used an ignore here
      if(pokemonData.errors) { //The name 'errors' is the label of the mongoose object containing all the model validation errors
        console.log("This console log means there are errors when the pokemon form attempted to submit, so it was unsuccessful.")
        this.hasFormErrors = true;
        this.pokemonFormErrors = pokemonData;
        // console.log("Here are the form errors:", this.pokemonFormErrors.errors);
        // console.log("Here is a specific error:", this.pokemonFormErrors.errors.pokemonName.message) 
      }
      else {
        console.log("This console log means the pokemon form submitted succesfully, and this is the Pokemon form data:", pokemonData);
        this.hasSubmittedSuccessfully = true;
        this.successMessage = "Pokemon created successfully!"
        this.hasFormErrors = false;
      }
    })
  }

  sendingPokemonObservable = {};

  hasFormErrors = false; //Default state of the form errors

  pokemonFormErrors : any; //Where the errors will be stored

  hasSubmittedSuccessfully = false;

  successMessage : any;

  url : any;

  // onFileUpload(event: any) {
  //   this.submittedPokemon.pokemonImage = event.target.files[0];
  // }
  
  constructor ( private _httpService: SharedService ) {
    
  }

  // onChange(event: any) {
  //   const file: File = event.target.files[0];
  //   console.log("On Change function, file:", file);
  // }
  
  // submitPokemonForm() {
  //   console.log("The submit button on the Pokemon form has been clicked.")
  //   const formDataObject = new FormData();
  //   formDataObject.set('pokemonData', this.submittedPokemon)
  //   formDataObject.set("pokemonName", this.pokemonName);
  //   formDataObject.set("pokemonImage", this.pokemonImage);
  //   console.log("This is the form data:", formDataObject);


  //   this.submittedPokemon.pokemonImage = this.fileInput.nativeElement.files[0]
  //   console.log("This is the pokemon data:", this.submittedPokemon)
  //   this.sendingPokemonObservable = this._httpService.createPokemonService(this.submittedPokemon).subscribe(pokemonData => {
  //     console.log("This is the form data submitted via the form after being subscribed to:", pokemonData)
  //     //@ts-ignore .ts is not happy with 'pokemonData.errors', so I used an ignore here
  //     if(pokemonData.errors) { //The name 'errors' is the label of the mongoose object containing all the model validation errors
  //       console.log("This console log means there are errors when the pokemon form attempted to submit, so it was unsuccessful.")
  //       this.hasFormErrors = true;
  //       this.pokemonFormErrors = pokemonData;
  //       // console.log("Here are the form errors:", this.pokemonFormErrors.errors);
  //       // console.log("Here is a specific error:", this.pokemonFormErrors.errors.pokemonName.message) 
  //     }
  //     else {
  //       console.log("This console log means the pokemon form submitted succesfully, and this is the Pokemon form data:", pokemonData);
  //       this.hasSubmittedSuccessfully = true;
  //       this.successMessage = "Pokemon created successfully!"
  //       this.hasFormErrors = false;
  //     }
  //   })

  // }
  
}