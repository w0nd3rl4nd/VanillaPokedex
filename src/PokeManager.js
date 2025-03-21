import {PokeCard} from './PokeCard.js'

let freecodecamp_api = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'

export async function ObtainPokeURLs() {
  try {
    const response = await fetch(freecodecamp_api);
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    
    const data = await response.json();
    return data.results.map(pokemon => pokemon.url);
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    return [];
  }
}

export async function getData() {
  try {
    const urls = await ObtainPokeURLs();
    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    });


    const return_array = await Promise.all(promises);
    return return_array.map(pokemonData => new PokeCard(pokemonData));
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

export function initializeImageToggler(pokemonCards) {
  return setInterval(() => {
    pokemonCards.forEach((pokemon, index) => {
      const imgElement = document.querySelectorAll('.pokemon-img')[index];
      if (!imgElement) return;
      
      imgElement.src = pokemon.getNextSprite(imgElement.src);
    });
  }, 2000);
}