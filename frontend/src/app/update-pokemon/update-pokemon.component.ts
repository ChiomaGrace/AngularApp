import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core'; //to save the image input
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from "@angular/forms"; //to create form data
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router'; //to get id from the url
import { Router } from '@angular/router' //to route to a differnet component

@Component({
  selector: 'app-update-pokemon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-pokemon.component.html',
  styleUrl: './update-pokemon.component.css'
})

export class UpdatePokemonComponent {

  pokemonId = ''; //it is a number as a string
  
  specificPokemon = []; // the data will come through as a json object, so we need to convert so it can be iteriable

  pokemonName: string = "";

  pokemonImage: string = "";

  @ViewChild('fileInput') inputElement!: ElementRef;
  
  updatedPokemonName: string = "";
  
  image : any;

  sendingPokemonObservable = {};

  hasFormErrors = false; //Default state of the form errors

  pokemonFormErrors : any; //Where the errors will be stored

  hasSubmittedSuccessfully = false;

  successMessage : any;

  pokemonNameFrontendValidationMessage: any;

  pokemonImageFrontendValidationMessage: any;

  constructor(private _httpService: SharedService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getSpecificPokemon();
  }

  getSpecificPokemon() {
    this._route.params.subscribe(params => {
      this.pokemonId = params['id']; // Access the 'id' parameter from the URL - the syntax is this way because the data is an object
      // console.log('Pokemon ID:', this.pokemonId);
      let specificPokemonObservable = this._httpService.specificPokemonService(this.pokemonId)
      specificPokemonObservable.subscribe(getPokemonData => {
        // console.log("Pokemon Data from getPokemonService:", getPokemonData);
        this.specificPokemon = getPokemonData
        // console.log("Specific Pokemon Data:", this.specificPokemon);
        for (let info in this.specificPokemon) { //extraxting the data we need from the object and saving as variables
            // console.log(this.specificPokemon[info]);
            if ( info === "pokemonName" ) {
              this.pokemonName = this.specificPokemon[info];
              // console.log("Pokemon Name:", this.pokemonName);
            }
            if ( info === "pokemonImage" ) {
              this.pokemonImage = this.specificPokemon[info];
              // console.log("Pokemon Image:", this.pokemonImage);
            }
          }
      })
    });
  }

  form = new FormGroup({
    pokemonNameFrontendValidation: new FormControl(this.updatedPokemonName, [Validators.required]),
    pokemonImageFrontendValidation: new FormControl(this.pokemonImage, [Validators.required]),
  });


  submittedPokemonName(event: any) {
    if(event.target.value) {
      this.updatedPokemonName = event.target.value;
      // console.log("Submitted Pokemon Name:", event.target.value);
    }
  }
  
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
    if (!this.form.controls.pokemonNameFrontendValidation.value && !this.form.controls.pokemonImageFrontendValidation.value) {
      this.pokemonNameFrontendValidationMessage = "Please type the name of the Pokemon";
      this.pokemonImageFrontendValidationMessage = "Please upload an image of the Pokemon";
      // console.log("Form Control Object:", this.form.controls, "Check if form is valid:", this.form.valid, "Pokemon name error:", this.form.controls.pokemonNameFrontendValidation.value, "Pokemon Image error:", this.form.controls.pokemonImageFrontendValidation.value);
    } else if ( !this.form.controls.pokemonNameFrontendValidation.value ) {
      this.pokemonNameFrontendValidationMessage = "Please type the name of the Pokemon";
      this.pokemonImageFrontendValidationMessage = "";
      return
    } else if ( !this.form.controls.pokemonImageFrontendValidation.value ){
      this.pokemonImageFrontendValidationMessage = "Please upload an image of the Pokemon";
      this.pokemonNameFrontendValidationMessage = "";
      return
    }
    const formData = new FormData();
    formData.append('pokemonName', this.updatedPokemonName);
    // console.log("Pokemon Name:", this.updatedPokemonName);
    formData.append('file', this.image);
    // console.log("Image:", this.image);
    console.log("Form Data:", formData)
    this.sendingPokemonObservable = this._httpService.updatePokemonService(formData, this.pokemonId).subscribe(pokemonData => {
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
          this.successMessage = "Pokemon updated successfully!"
          this.hasFormErrors = false;
          this.form.controls['pokemonNameFrontendValidation'].reset(); //resetting the text input
          this.inputElement.nativeElement.value = ''; //resetting the file input
          this.router.navigate(['/show']); 

      }
    })
  }
}
