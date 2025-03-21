// Create an exportable class named PokeCard that will represent the card of each Pokemon
export class PokeCard {

    // Create a constructor that will take an object Pokemon and populate the attributes with its values
    constructor(pokemonData) {
        this.id = pokemonData.id;
        this.name = this.capitalizeName(pokemonData.name);
        this.height = pokemonData.height;
        this.weight = pokemonData.weight;
        this.sprite_front = pokemonData.sprites?.front_default || './public/fallback.svg';
        this.sprite_shiny = pokemonData.sprites?.front_shiny || this.sprite_front;
    }

    // Function used to auto capitalise the first letter of the name attribute
    capitalizeName(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    // Detects the current sprite and returs the other one (if front return shiny, if shiny return front)
    // Used elsewhere to perform the actual swapping of the images
    getNextSprite(currentSrc) {
        return currentSrc.includes(this.sprite_front) 
          ? this.sprite_shiny 
          : this.sprite_front;
      }

}