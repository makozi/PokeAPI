import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

interface Pokemon {
  name: string;
}

const Category = () => {
  const router = useRouter();
  const { category } = router.query as { category: string };

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (category) {
      const fetchPokemons = async () => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${
            currentPage * 25
          }&limit=25&type=${category}`,
        );
        const pokemons: Pokemon[] = response.data.results;

        setPokemons(pokemons);
      };

      fetchPokemons();
    }
  }, [currentPage, category]);

  const handlePagination = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <h1>{category}</h1>

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
 
      <button onClick={() => handlePagination(currentPage + 1)}>
        Next Page
      </button>
    </div>
  );
};

export default Category;
