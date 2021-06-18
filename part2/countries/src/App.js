import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCountries from "./components/DisplayCountries";

const App = () => {
  const [countries, setCountries] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState();

  const fetchCountriesData = async () => {
    try {
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchWeatherInfo = async (capital) => {
    try {
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
      );
      setWeatherInfo(res.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const filterCountries = () => {
    const countriesSearch = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (countriesSearch.length === 1) {
      fetchWeatherInfo(countriesSearch[0].capital);
    }
    setFilteredCountries(countriesSearch);
  };

  const handleFilterChange = (e) => {
    setSearchQuery(e.target.value);
    filterCountries();
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const handleSetCountries = (country) => {
    fetchWeatherInfo(country.capital);
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
          weatherInfo={weatherInfo}
        />
      ) : null}
    </>
  );
};

export default App;
