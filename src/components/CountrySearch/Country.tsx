import { Button } from '@mui/material';
import Weather from '../CountryInfo/Weather';
import Language from '../CountryInfo/Language';
import Flag from '../CountryInfo/Flag';
import { WeatherInterface } from '../../types';

interface CountryProps {
  name: string;
  capital: string[];
  area: number;
  languages: {
    [key: string]: string;
  };
  flags: { png: string; svg: string };
  weather: WeatherInterface | undefined;
  backButton: () => void;
}

const Country = ({
  name,
  capital,
  area,
  languages,
  flags,
  weather,
  backButton,
}: CountryProps) => {
  const flagWidth = 200;
  return (
    <div>
      <h1>{name}</h1>
      Capitlal: {capital} <br />
      Area: {area} <br />
      <br />
      <h2>Languages:</h2>
      <Language languages={languages} />
      <Flag flag={flags.svg} name={name} flagWidth={flagWidth} />
      <h2>Weather in {capital ? capital : name}</h2>
      {weather ? <Weather weather={weather} /> : null}
      <Button
        onClick={() => backButton()}
        variant="contained"
        sx={{ mt: 2 }}
        size="small"
      >
        Back to list
      </Button>
    </div>
  );
};

export default Country;

