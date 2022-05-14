const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

// O fetch é utilizado para fazer requisições no browser
// O método fetch, retorna uma promisse
// Promisse é um objeto que pepresenta o sucesso de uma operação assíncrona
// fetch(url)
// Essa função está retornando a resposta da promisse convertida em json
// .then(response => response.json())
// Mas isso também resulta em uma promisse
// .then(pokemon => {})

// const pokemonPromisses = []

// for (let i = 1; i <= 150; i++) {
//   // para que a cada interação a gente adicione um item nesse array
//   pokemonPromisses.push(
//     fetch(getPokemonUrl(i)).then(response => response.json())
//   )
// }
// O codigo acima foi refatorado e se transformou no "generatePokemonPromisses"
const generatePokemonPromisses = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then(response => response.json())
    )
const fetchPokemon = () => {
  const pokemonPromisses = generatePokemonPromisses()

  Promise.all(pokemonPromisses).then(pokemons => {
    // Temos um array com 150 objetos e a gente quer reduzir esse array em uma string que é o nosso template HTML
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      accumulator += `
        <li class= "card ${types[0]}">
          <img class="card-image" alt="${
            pokemon.name
          }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png"/>
          <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(' | ')}</p>
        </li>
      `
      return accumulator
    }, '')

    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = lisPokemons
  })
}

fetchPokemon()
