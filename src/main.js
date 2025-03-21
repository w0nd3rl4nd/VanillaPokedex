import './style.css'
import { getData, initializeImageToggler } from './PokeManager'

const init = async () => {

  document.querySelector('#app').innerHTML = `<h1 class="loading">Loading...</h1>`;

  const pokeCards = await getData();

  const header = `<h1 class="header">Alice's PokéDex</h1>`;

  const htmlContent = pokeCards.map(pokemon => `
    <div class='pokemon'>
      <p class='id'>#${pokemon.id}</p>
      <p class='name'>${pokemon.name}</p> <!-- Changed -->
      <p>Height: ${pokemon.height} m</p>
      <p>Weight: ${pokemon.weight} kg</p>
      <img class='pokemon-img' src='${pokemon.sprite_front}' alt='${pokemon.name}' />
    </div>
  `).join('');

  document.querySelector('#app').innerHTML = header + htmlContent;

  initializeImageToggler(pokeCards);
}

init();