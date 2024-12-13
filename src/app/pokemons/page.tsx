import React from "react";
import Link from "next/link";

interface Pokemon {
  name: string;
  id: number;
  image: string;
}

const PokemonPage = async () => {
  // Récupérer les données de l'API PokéAPI
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();

  console.log(data)

  // Transformation des données pour inclure l'ID et l'URL des images
  const pokemons: Pokemon[] = data.results.map((pokemon: { name: string }, index: number) => ({
    name: pokemon.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-black text-3xl font-bold text-center mb-6">Liste des Pokémons</h1>
      <ul className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center "
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto mb-2"
              />
              <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
              <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonPage;
