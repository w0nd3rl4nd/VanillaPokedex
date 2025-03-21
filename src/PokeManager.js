// Import the PokeCard class
import {PokeCard} from './PokeCard.js'

// Define the URL where we will obtain pokemons from
let freecodecamp_api = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'

// Function to obtain the pokemon URLs at the freecodecamp apis (because this api returns a list of URL, each per pokemon).
// It is async because all fetch must be done asyncronously so we don't block the rest of the code
async function ObtainPokeURLs() {
  // We use a try/catch so that errors are handled. You can ignore this if you don't understand but it's pretty self explanatory
  try {
    // Define a response object that is a promise
    const response = await fetch(freecodecamp_api);
    // Throw error if fails
    if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
    
    // Define data as the resolution of the promise and decode the JSON. We AWAIT for the promise to resolve
    const data = await response.json();
    // Map the data object results as an array of pokemon urls that we return 
    return data.results.map(pokemon => pokemon.url);
  } catch (error) {
    // If there was an error in the try code, we would fallback here and throw this error
    console.error("Failed to fetch Pokémon list:", error);
    return [];
  }
}

// This function will get the data objects for each pokemon. It can be exported as we use it in main.
export async function getData() {
  try {
    // Define array of urls as the return of ObtainPokeURLs()
    const urls = await ObtainPokeURLs();
    // Define an array of promises, one for each URL in the URL array
    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return await response.json();
    });

    // Define an array of objects when all promises are resolved
    const return_array = await Promise.all(promises);
    // Map each object to a PokeCard and return as an array (we use the PokeCard constructor to create each object)
    return return_array.map(pokemonData => new PokeCard(pokemonData));
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

// With this function we configure an interval that will stay active after loading 
// and dynamically launch the getNextSprite for each pokemon. We give the cards as arg
export function initializeImageToggler(pokemonCards) {
  // We return the setInterval element
  return setInterval(() => {
    // For each pokemon card
    pokemonCards.forEach((pokemon, index) => {
      // Seek the image element in the card
      const imgElement = document.querySelectorAll('.pokemon-img')[index];
      if (!imgElement) return;
      
      // getNextSprite for that card
      imgElement.src = pokemon.getNextSprite(imgElement.src);
    });
    // 2000 for 2000 milliseconds which equals 2 seconds
  }, 2000);
}