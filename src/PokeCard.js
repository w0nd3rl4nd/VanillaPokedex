export class PokeCard {

    constructor(pokemonData) {
        this.id = pokemonData.id;
        this.name = this.capitalizeName(pokemonData.name);
        this.height = pokemonData.height;
        this.weight = pokemonData.weight;
        this.sprite_front = pokemonData.sprites?.front_default || './public/fallback.svg';
        this.sprite_shiny = pokemonData.sprites?.front_shiny || this.sprite_front;
    }

    capitalizeName(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    getNextSprite(currentSrc) {
        return currentSrc.includes(this.sprite_front) 
          ? this.sprite_shiny 
          : this.sprite_front;
      }

}