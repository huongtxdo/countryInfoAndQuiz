import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { CountryInterface, WeatherInterface } from '../../types';
import SearchCountries from '../CountrySearch/SearchCountries';
import Country from '../CountrySearch/Country';
import Countries from '../CountrySearch/Countries';
import { useCountryContext } from '../../state/CountryContext';

const HomePage = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [oneCountry, setOneCountry] = useState<CountryInterface | undefined>(); //checker for Country-component
  const [showCountries, setShowCountries] = useState<boolean>(true); // checker for Countries-component
  const [weather, setWeather] = useState<WeatherInterface | undefined>();
  const [searchCountries, setSearchCountries] = useState<CountryInterface[]>(
    []
  );

  const { countries } = useCountryContext();

  const location = useLocation();
  useEffect(() => {
    setSearchName('');
    setSearchCountries([]);
    setOneCountry(undefined);
    setWeather(undefined);
  }, [location]);

  const handleWeather = (country: CountryInterface) => {
    const api_key = process.env.REACT_APP_API_KEY;
    let coords: string[] = [];
    if (!country.capital) {
      coords = country.latlng;
    } else {
      coords = country.capitalInfo.latlng;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${api_key}`;
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  };

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchName(input);
    const tempCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    if (tempCountries.length === 1) {
      setOneCountry(tempCountries[0]);
      handleWeather(tempCountries[0]);
      setShowCountries(false);
    } else {
      setShowCountries(true);
      setOneCountry(undefined);
      setSearchCountries(tempCountries);
    }
  };

  const clickShowButton = (country: CountryInterface) => {
    setShowCountries(!showCountries);
    setOneCountry(country);
    handleWeather(country);
  };

  const backToCountryList = () => {
    setShowCountries(!showCountries);
    setOneCountry(undefined);
    setWeather(undefined);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Country info
        </Typography>
        <SearchCountries
          searchName={searchName}
          handleSearchName={handleSearchName}
        />
      </Box>
      {showCountries ? (
        <Countries
          searchName={searchName}
          searchCountries={searchCountries}
          clickShowButton={clickShowButton}
        />
      ) : null}
      {oneCountry ? (
        <Country
          name={oneCountry.name.common}
          capital={oneCountry.capital}
          area={oneCountry.area}
          languages={oneCountry.languages}
          flags={oneCountry.flags}
          weather={weather}
          backButton={backToCountryList}
        />
      ) : null}
    </>
  );
};

export default HomePage;

