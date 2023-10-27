'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../../styles/page.module.css';

const Page = () => {
  const [paths, setPaths] = useState<string | null>('');
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [baseexperience, setBaseExperience] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Fetch data from the PokeAPI
    const path = localStorage.getItem('test');
    if (path) {
      setPaths(path);
    }
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const url = localStorage.getItem('url');
      if (url) {
        const response = await axios.get(url);
        const detail = response.data;

        setPokemons(detail.abilities);
        setBaseExperience(detail.base_experience);
        setHeight(detail.height);
        setWeight(detail.weight);
      }
    };

    fetchPokemons();
  }, [currentPage, paths]);

  console.log(pokemons, 'details');

  const getRandomColor = () => {
    const colors = ['#3498db', '#f1c40f', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>{paths?.toUpperCase()}</h1>

        <h2 className={styles.titleDetails}>Abilities</h2>
        <ul>
          {pokemons.map((ability, index) => (
            <li key={index} className={styles.abilitydetails}>
              <strong>Name:</strong> {ability.ability.name}
              <br />
              <strong>Is Hidden:</strong> {ability.is_hidden ? 'Yes' : 'No'}
              <br />
              <strong>Slot:</strong> {ability.slot}
              <br />
            </li>
          ))}

          <div className={styles.titleDetails}>
            {baseexperience !== null ? (
              <p>Base Experience: {baseexperience}</p>
            ) : (
              <p>Loading base experience...</p>
            )}
          </div>

          <div className={styles.titleDetails}>
            {height !== null ? (
              <p>Height: {height}</p>
            ) : (
              <p>Loading base height...</p>
            )}
          </div>

          <div className={styles.titleDetails}>
            {weight !== null ? (
              <p>Weight: {weight}</p>
            ) : (
              <p>Loading base weight...</p>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Page;
