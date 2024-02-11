import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePokemonComponent } from './update-pokemon.component';

describe('UpdatePokemonComponent', () => {
  let component: UpdatePokemonComponent;
  let fixture: ComponentFixture<UpdatePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
