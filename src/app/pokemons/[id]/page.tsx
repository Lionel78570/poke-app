import React from "react";

// Interface pour les informations détaillées du Pokémon
interface PokemonDetailProps {
  params: { id: string };  // Paramètre dynamique : l'ID du Pokémon
}

const PokemonDetailPage = async ({ params }: PokemonDetailProps) => {
  const { id } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-black text-3xl font-bold text-center mb-6 capitalize">{pokemon.name}</h1>
      <div className="text-black flex justify-center items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mb-6"
        />
        <div className="ml-6">
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Types:</strong> {pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(", ")}</p>
          <p><strong>Abilities:</strong> {pokemon.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
