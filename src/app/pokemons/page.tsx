import React from "react";
import Link from "next/link";
import pokemons from "@/app/data/pokemon-fr.json";

const PokemonPage = () => {
  // Trier les Pokémon par ordre alphabétique
  const sortedPokemons = [...pokemons].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-black text-3xl font-bold text-center mb-6">
        Liste des Pokémons
      </h1>
      <ul className="text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedPokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 mx-auto mb-2"
              />
              {/* Affiche le nom et l'ID du Pokémon */}
              <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
              <p className="text-sm text-gray-500">
                ID officiel (ordre de sortie) : {pokemon.id}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonPage;
