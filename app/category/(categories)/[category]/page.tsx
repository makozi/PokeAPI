'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import styles from '../../../../styles/page.module.css';
import React from 'react';

const Page: React.FC = () => {
  const [paths, setPaths] = useState<string>('');
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);

  useEffect(() => {
    const path = localStorage.getItem('test');
    if (path) {
      setPaths(path);
    }
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (currentPage - 1) * 25
        }&limit=25&type=${paths}&q=${searchInput}`
      );
      const pokemons = response.data.results;

      setPokemons(pokemons);
    };

    fetchPokemons();
  }, [currentPage, paths, searchInput]);

  const handlePagination = (nextPage: React.SetStateAction<number>) => {
    setCurrentPage(nextPage);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchInput(inputValue);
  };

  useEffect(() => {
    const filtered = pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchInput)
    );
    setFilteredPokemons(filtered);
  }, [searchInput, pokemons]);

  const displayPokemons =
    filteredPokemons.length > 0 ? filteredPokemons : pokemons;

  const handleLinkClick = (categoryName: string, categoryNameURL: string) => {
    localStorage.setItem('test', categoryName);
    localStorage.setItem('url', categoryNameURL);
  };

  const getRandomColor = () => {
    const colors = ['#3498db', '#f1c40f', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>{paths.toUpperCase()}</h1>

        <input
          type='text'
          placeholder='Search Pokemon'
          value={searchInput}
          onChange={handleSearchInputChange}
          className={styles.input}
        />

        <div className={styles.categoriesContainer}>
          {displayPokemons.map((pokemon: any) => (
            <div
              key={pokemon.name}
              className={styles.card}
              style={{ backgroundColor: getRandomColor() }}
            >
              <Link
                href={`/pokemon/${pokemon.name}`}
                onClick={() => handleLinkClick(pokemon.name, pokemon.url)}
              >
                <span className={styles.link}>
                  {pokemon.name.toUpperCase()}
                </span>
              </Link>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};

export default Page;
