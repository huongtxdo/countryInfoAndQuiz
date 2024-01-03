import { createContext, PropsWithChildren, useContext, useState } from 'react';
import axios from 'axios';
import { CountryInterface } from '../types';

interface CountryContext {
  countries: CountryInterface[];
  // setCountries: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const CountryContext = createContext<CountryContext | null>(null);

export function CountryProvider(props: PropsWithChildren) {
  const [countries, setCountries] = useState<CountryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    fetCountries();
    return <>loading... </>;
  }

  if (!countries) {
    return <>no diagnosis or countries</>;
  }

  return (
    <CountryContext.Provider value={{ countries }}>
      {props.children}
    </CountryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context)
    throw new Error('useCountryContext must be used within CountryProvider');
  return {
    countries: context.countries,
  };
};

