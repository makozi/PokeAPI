"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/page.module.css";
import React from "react";

const Hero = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.results.map((category) => category);
        setCategories(categories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLinkClick = (categoryName: string) => {
    localStorage.setItem("test", categoryName);
  };

  const getRandomColor = () => {
    const colors = ["#3498db", "#f1c40f", "#2ecc71"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div>
        <p className={styles.title}>Pokemon App</p>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <div
              key={category.name}
              className={styles.card}
              style={{ backgroundColor: getRandomColor() }}
            >
              <Link
                href={`/category/${category.name}`}
                onClick={() => handleLinkClick(category.name)}
              >
                <span className={styles.link}>
                  {category.name.toUpperCase()}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
