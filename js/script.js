const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let procurarPokemon = 1;

const buscarpokemon = async (pokemon) => {
    const APIresposta = await  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresposta.status === 200) {
        const data = await APIresposta.json();
        return data;
    }
}

const renderizarpokemon = async (pokemon) => {

    pokemonName.innerHTML = 'loading...';
    pokemonNumber.innerHTML = '';
    const data = await buscarpokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    renderizarpokemon(input.value.toLowerCase()); 
});

buttonPrev.addEventListener('click', () => {
    if (procurarPokemon > 1) {
      procurarPokemon -= 1;
      renderizarpokemon(procurarPokemon);
    }
});

buttonNext.addEventListener('click', () => {
   procurarPokemon += 1;
   renderizarpokemon(procurarPokemon);
 });

renderizarpokemon('procurarPokemon');