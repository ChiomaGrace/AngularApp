import { Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { SharedService } from "../shared.service";


@Component({
  selector: 'app-create-pokemon',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './create-pokemon.component.html',
  styleUrl: './create-pokemon.component.css'
})

export class CreatePokemonComponent {

  constructor ( private _httpService: SharedService ) {
    
  }

  ngOnInit(): void {

  }


  @ViewChild('fileInput') inputElement!: ElementRef;
  
  pokemonName: string = "";
  
  image : any;

  sendingPokemonObservable = {};

  hasFormErrors = false; //Default state of the form errors

  pokemonFormErrors : any; //Where the errors will be stored

  hasSubmittedSuccessfully = false;

  successMessage : any;

  pokemonNameFrontendValidationMessage: any;

  pokemonImageFrontendValidationMessage: any;

  submittedPokemonName(event: any) {
    if(event.target.value) {
      this.pokemonName = event.target.value;
      // console.log("Submitted Pokemon Name:", event.target.value);
    }
  }
  
  form = new FormGroup({
    pokemonNameFrontendValidation: new FormControl(this.pokemonName, [
      Validators.required,
    ]),
  });

  submittedPokemonImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      // console.log("submitted image:", this.image);
    }
  }

  removePokemonImage(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      // console.log("remove image:", this.image);
    }
  }

  onSubmit() {
    if (!this.form.valid && !this.image) {
      this.pokemonNameFrontendValidationMessage = "Please type the name of the Pokemon";
      this.pokemonImageFrontendValidationMessage = "Please upload an image of the Pokemon";
      // console.log("Form Control Object:", this.form.controls, "Check if form is valid:", this.form.valid);
      return
    }
    if (!this.form.valid) {
      // this.hasSubmittedSuccessfully =
      this.pokemonNameFrontendValidationMessage = "Please type the name of the Pokemon";
      this.pokemonImageFrontendValidationMessage =  "";
      return
    }
    const formData = new FormData();
    formData.append('pokemonName', this.pokemonName);
    // console.log("Pokemon Name:", this.pokemonName);
    formData.append('file', this.image);
    // console.log("Image:", this.image);
    console.log("Form Data:", formData)
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
          this.hasFormErrors = false;
          this.form.controls['pokemonNameFrontendValidation'].reset(); //resetting the text input
          this.inputElement.nativeElement.value = ''; //resetting the file input
      }
    })
  }
  
}