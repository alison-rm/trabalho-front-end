import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CountryPage.css';

const CountryPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountry();
  }, [code]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!country) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>{country.name.common}</h1>
        <img src={country.flags.png} alt={country.name.common} />
        <p>Capital: {country.capital}</p>
        <p>População: {country.population}</p>
        <p>Região: {country.region}</p>
      </div>
      <button className='buttonVoltar' onClick={handleGoBack}>Voltar</button>
    </div>
  );
};

export default CountryPage;


