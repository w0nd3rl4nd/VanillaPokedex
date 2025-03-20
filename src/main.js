import './style.css'
import { makePokeURLs, getData } from './PokeManager'

const maxId = 386;

let data = await getData(makePokeURLs(maxId))

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const init = async () => {
  const data = await getData(makePokeURLs(maxId));

  const header = `<h1 class="header">Alice's PokéDex</h1>`;

  const htmlContent = data.map(pokemon => `
    <div class='pokemon'>
      <p class='id'>${pokemon.id}</p>
      <p class='name'>${capitalizeFirstLetter(pokemon.name)}</p>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <img class='pokemon-img src='${pokemon.sprites.front_default}' alt='${pokemon.name}' />
    </div>
  `).join('');

  document.querySelector('#app').innerHTML = header + htmlContent;

  toggleImages(data);
}

init();

const toggleImages = (data) => {
  setInterval(() => {
    data.forEach((pokemon, index) => {
      const imgElement = document.querySelectorAll('.pokemon-img')[index];
      const currentSrc = imgElement.src;
      
      if (currentSrc.includes(pokemon.sprites.front_default)) {
        imgElement.src = pokemon.sprites.front_shiny;
      } else {
        imgElement.src = pokemon.sprites.front_default;
      }
    });
  }, 2000);
}