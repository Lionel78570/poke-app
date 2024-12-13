import React from "react";
import pokemons from "@/app/data/pokemon-fr.json";

// Interface pour les informations détaillées du Pokémon
interface PokemonDetailProps {
  params: { id: string }; // Paramètre dynamique : l'ID du Pokémon
}

const PokemonDetailPage = async ({ params }: PokemonDetailProps) => {
  const { id } = params;

  // Récupérer les données du Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();

  // Trouver le nom en français dans le fichier JSON
  const translatedPokemon = pokemons.find((p) => p.id === parseInt(id));
  const frenchName = translatedPokemon ? translatedPokemon.name : pokemon.name;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-black text-3xl font-bold text-center mb-6 capitalize">
        {frenchName}
      </h1>
      <div className="text-black flex justify-center items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={frenchName}
          className="w-48 h-48 mb-6"
        />
        <div className="ml-6">
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Hauteur:</strong> {pokemon.height / 10} m</p>
          <p><strong>Poids:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Types:</strong> {pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(", ")}</p>
          <p><strong>Capacités:</strong> {pokemon.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
