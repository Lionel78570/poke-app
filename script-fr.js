const fs = require('fs');
const fetch = require('node-fetch');
const pLimit = require('p-limit');

// Limiter à 10 requêtes simultanées
const limit = pLimit(10);

const generatePokemonData = async () => {
  const pokemons = [];
  const promises = [];

  // Fonction de récupération des données Pokémon
  const fetchPokemonData = async (id) => {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
    const speciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json());
    
    // Récupérer le nom en français
    const frenchName = speciesData.names.find(name => name.language.name === 'fr')?.name || `Pokemon ${id}`;

    // Ajouter l'image et le nom français
    return {
      id,
      name: frenchName,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  };

  // Limiter le nombre de requêtes simultanées à 10
  for (let i = 1; i <= 1000; i++) {
    // Ajouter la fonction de récupération dans le tableau des promesses
    const pokemonPromise = limit(() => fetchPokemonData(i).then(pokemon => pokemons.push(pokemon)));
    promises.push(pokemonPromise);
  }

  // Attendre la fin de toutes les promesses
  await Promise.all(promises);

  // Sauvegarder les données dans un fichier JSON
  fs.writeFileSync('./src/app/data/pokemon-fr.json', JSON.stringify(pokemons, null, 2), 'utf8');
  console.log('Fichier pokemon-fr.json généré');
};

generatePokemonData();
