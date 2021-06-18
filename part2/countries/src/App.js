import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

const DisplayCountries = ({ countries, handleSetCountries }) => {
  if (countries.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length < 10 && countries.length !== 1) {
    return (
      <>
        {countries.map((country) => (
          <>
            <p key={country.numericCode}>{country.name}</p>{" "}
            <button onClick={() => handleSetCountries(country)}>show</button>
          </>
        ))}
      </>
    );
  }

  if (countries.length === 1) {
    return (
      <>
        {countries.map((country) => (
          <Fragment key={country.numericCode}>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
              {country.languages.map((language) => (
                <Fragment key={language}>
                  <li>{language.name}</li>
                </Fragment>
              ))}
            </ul>
            <img src={country.flag} alt={country.name} width="150" />
          </Fragment>
        ))}
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  console.log(filteredCountries);

  const fetchCountriesData = async () => {
    try {
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const filterCountries = () => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleFilterChange = (e) => {
    setSearchQuery(e.target.value);
    filterCountries();
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const handleSetCountries = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <>
      find countries:{" "}
      <input name="filter" value={searchQuery} onChange={handleFilterChange} />
      {filteredCountries.length > 0 ? (
        <DisplayCountries
          countries={filteredCountries}
          handleSetCountries={handleSetCountries}
        />
      ) : null}
    </>
  );
};

export default App;
