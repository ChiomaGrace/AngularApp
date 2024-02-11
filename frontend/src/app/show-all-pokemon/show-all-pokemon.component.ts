import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from "../shared.service";
import { CommonModule } from '@angular/common'; //so we can use ngFor to display the data
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router' //to route to a different component


@Component({
  selector: 'app-show-all-pokemon',
  standalone: true,
  imports: [CommonModule, RouterModule], //needd commonModule in order to loop through the data and RouterMoudle for routing
  templateUrl: './show-all-pokemon.component.html',
  styleUrl: './show-all-pokemon.component.css'
})
export class ShowAllPokemonComponent {
  allPokemon = []; // so the data can be iterable
  specificPokemon = {}
  
  constructor(private _httpService: SharedService, private router: Router) { }

  ngOnInit() {
    this.allPokemonData() //so the function runs as soon as the page is uploaded
  }

  allPokemonData(){
    // console.log("This is the all Pokemon function in the ts file.")
    let allPokemonObservable = this._httpService.allPokemonService()
    allPokemonObservable.subscribe(allPokemonData => {
      this.allPokemon = allPokemonData;
      // console.log("All Pokemon after subscribing from the service:", this.allPokemon); //comes through as an array of objects
    })
  }

  deletePokemon(id: any) {
    console.log("This is the delete function in the show-all-pokemon.ts.")
    let deletePokemonObservable = this._httpService.deletePokemonService(id) 
    deletePokemonObservable.subscribe(deletePokemonData => { 
      this.specificPokemon = deletePokemonData
      console.log("Deleting the following data:", deletePokemonData)
      this.allPokemonData()
      this.router.navigate(['/show']); 
    })
  }
}
