import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPokemonComponent } from './show-all-pokemon.component';

describe('ShowAllPokemonComponent', () => {
  let component: ShowAllPokemonComponent;
  let fixture: ComponentFixture<ShowAllPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAllPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
