import { Fragment } from "react";

const DisplayCountries = ({ countries, handleSetCountries, weatherInfo }) => {
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
            {weatherInfo ? (
              <>
                <h2>Weather in {country.capital}</h2>
                <p>
                  <strong>temperature</strong> {weatherInfo.current.temperature}{" "}
                  Celsius
                </p>
                <img
                  width="50px"
                  alt="weather icon"
                  src={weatherInfo.current.weather_icons[0]}
                />
                <p>
                  <strong>wind</strong> {weatherInfo.current.wind_speed}mph
                  direction {weatherInfo.current.wind_dir}
                </p>
              </>
            ) : null}
          </Fragment>
        ))}
      </>
    );
  }
};

export default DisplayCountries;
