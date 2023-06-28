import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Lista de Países</h1>
      <ul>
        {currentCountries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/country/${country.cca3}`}>{country.name.common}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <span>Página {currentPage + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * countriesPerPage >= countries.length}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default HomePage;


