import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreatePokemonComponent } from "./create-pokemon/create-pokemon.component";
import { ShowAllPokemonComponent } from "./show-all-pokemon/show-all-pokemon.component";
import { UpdatePokemonComponent } from "./update-pokemon/update-pokemon.component";
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, CreatePokemonComponent, ShowAllPokemonComponent, UpdatePokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular CRUD App';
  
}
