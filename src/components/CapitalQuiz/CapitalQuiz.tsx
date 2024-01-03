import lodash from 'lodash';
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Typography, Box, Button, Alert, Slider, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Notification from '../Notification';
import QuizButtons from './QuizButtons';
import { useCountryContext } from '../../state/CountryContext';
// import { CountryInterface } from '../../types';

const CapitalQuiz = () => {
  const [sliderValue, setSlidervalue] = useState(2);
  const [forceRerender, setForceRerender] = useState(false);
  const [difficulty, setDifficulty] = useState(2);
  const [country, setCountry] = useState<string[]>([]);
  const [capital, setCapital] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedCapital, setSelectedCapital] = useState<string | undefined>();
  const [win, setWin] = useState(false);

  // states for notifications
  const [severity, setSeverity] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const { countries } = useCountryContext();
  const subCountries = useMemo(
    () => lodash.sampleSize(countries, difficulty),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countries, difficulty, forceRerender]
  );

  // states for re-rendering the page when clicking on the Quiz button on nav bar
  const location = useLocation();

  useEffect(() => {
    setSelectedCountry(undefined);
    setSelectedCapital(undefined);
    setWin(false);
    setMessage('Select the correct capital for each country');
    setSeverity('info');
    const nameList: string[] = [];
    subCountries.forEach((country) => {
      nameList.push(country.name.common);
    });
    setCountry(lodash.shuffle(nameList));
    setCapital(
      subCountries.map((country) =>
        country.capital ? country.capital[0] : country.name.common
      )
    );
  }, [countries, difficulty, location, subCountries]);

  // function for changing message and severity
  const notiChange = (message: string, severity: string) => {
    let timer;
    const startTimer = () =>
      (timer = setTimeout(() => {
        setMessage('Select the correct capital for each country');
        setSeverity('info');
      }, 5000));

    setMessage(message);
    setSeverity(severity);

    clearTimeout(timer);
    startTimer();
  };

  // checking selection and win condition
  if (selectedCountry && selectedCapital) {
    const countryFromSubCountries = subCountries.find(
      (country) => country.name.common === selectedCountry
    );
    if (countryFromSubCountries) {
      const correctCapital = countryFromSubCountries.capital
        ? countryFromSubCountries.capital[0]
        : countryFromSubCountries.name.common;
      if (selectedCapital === correctCapital) {
        const updatedCountryList = country.filter((c) => c !== selectedCountry);
        const updatedCapitalList = capital.filter((c) => c !== selectedCapital);
        notiChange(
          `Correct! ${selectedCapital} is the capital of ${selectedCountry}.`,
          'success'
        );
        if (updatedCountryList.length === 0) setWin(true);
        setCountry(updatedCountryList);
        setCapital(updatedCapitalList);
      } else {
        notiChange(
          `${selectedCapital} is not the capital of ${selectedCountry}.`,
          'error'
        );
      }
      setSelectedCapital(undefined);
      setSelectedCountry(undefined);
    }
  }

  // styling for Box
  const boxSx = {
    marginTop: 3,
    marginBottom: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const renderWinPage = () => (
    <Box sx={boxSx}>
      <Notification message={message} severity={severity} />
      <Alert severity="success" sx={{ marginTop: 3 }}>
        <strong>Well done!</strong>
      </Alert>
      <Typography variant="h6">Number of countries?</Typography>
      <Slider
        aria-labelledby="non-linear-slider"
        aria-label="difficulty"
        defaultValue={2}
        onChange={(_, value) => setSlidervalue(Number(value))}
        value={sliderValue}
        valueLabelDisplay="auto"
        marks
        step={1}
        min={2}
        max={15}
      />
      <Button
        onClick={() => {
          difficulty === sliderValue
            ? setForceRerender((state) => !state)
            : setDifficulty(sliderValue);
        }}
      >
        New round
      </Button>
    </Box>
  );

  if (!subCountries || !country || !capital) return <></>;
  if (win) return renderWinPage();

  return (
    <Box sx={boxSx}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: 1 }}>
        Country capital quiz
      </Typography>
      <Notification message={message} severity={severity} />
      <ThemeProvider theme={theme}>
        <Stack direction="row" gap={2} justifyContent={'space-between'}>
          <Stack>
            <QuizButtons
              countryOrCapital={country}
              selected={selectedCountry}
              setSelected={setSelectedCountry}
              mainColor={`primary.main`}
              lightColor={'primary.light'}
            />
          </Stack>
          <Stack>
            <QuizButtons
              countryOrCapital={capital}
              selected={selectedCapital}
              setSelected={setSelectedCapital}
              mainColor={'secondary.main'}
              lightColor={'secondary.light'}
            />
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};

const theme = createTheme({
  palette: {
    // country: primary, capital: secondary
    primary: {
      light: '#f5e9c9',
      main: '#fad264',
    },
    secondary: {
      light: '#F5EBFF',
      main: '#E0C2FF',
    },
  },
});

export default CapitalQuiz;

