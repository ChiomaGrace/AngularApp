import { Routes } from '@angular/router';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { ShowAllPokemonComponent } from './show-all-pokemon/show-all-pokemon.component';
import { UpdatePokemonComponent } from './update-pokemon/update-pokemon.component';
import { DeletePokemonComponent } from './delete-pokemon/delete-pokemon.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {'path': '', component: HomeComponent},
    {'path': 'create', component: CreatePokemonComponent},
    {'path': 'show', component: ShowAllPokemonComponent},
    {'path': 'update/:id', component: UpdatePokemonComponent},
    {'path': 'delete/:id', component: DeletePokemonComponent},
];
