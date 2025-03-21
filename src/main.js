// Import the styling and the functions from PokeManager that will fetch de PokeCard objects and the toggler so switch between sprites (images) dynamically
import './style.css'
import { getData, initializeImageToggler } from './PokeManager'

// Create an async function to create the HTML of the web for each PokeCard as we receive them
const init = async () => {

  // Initialise a Loading message so the web makes it clear it is loading at first
  document.querySelector('#app').innerHTML = `<h1 class="loading">Loading...</h1>`;

  // Create an array of pokeCards objects as returned from the getData() function. We use away so that we wait for the getData() return as it has to first get the items from the web.
  const pokeCards = await getData();

  // Define the title of the website
  const header = `<h1 class="header">Alice's PokéDex</h1>`;

  // We use map in order to perform the action for each pokemon object in the pokeCards array
  // We access the pokemon object properties to create the objects
  // After each iteration, we join each resulting HTML div into a giant string that then is stored in htmlContent
  const htmlContent = pokeCards.map(pokemon => `
    <div class='pokemon'>
      <p class='id'>#${pokemon.id}</p>
      <p class='name'>${pokemon.name}</p> <!-- Changed -->
      <p>Height: ${pokemon.height} m</p>
      <p>Weight: ${pokemon.weight} kg</p>
      <img class='pokemon-img' src='${pokemon.sprite_front}' alt='${pokemon.name}' />
    </div>
  `).join('');

  // Join the header and the htmlContent
  document.querySelector('#app').innerHTML = header + htmlContent;

  // Launches the image toggler for the pokeCards so that the sprites change dynamically
  initializeImageToggler(pokeCards);
}

// Launch the init function
init();