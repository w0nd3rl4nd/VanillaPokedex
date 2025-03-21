class PokeCard {

    constructor(id, name, height, weight, sprite_front, sprite_shiny) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.sprite_front = sprite_front;
        this.sprite_shiny = sprite_shiny;
        this.name = capitalizeName(this.name);
    }

    capitalizeName(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
      }


}