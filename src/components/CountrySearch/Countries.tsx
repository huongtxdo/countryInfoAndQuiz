import { Alert, List, ListItem, Button, ListItemIcon } from '@mui/material';

import Flag from '../CountryInfo/Flag';
import { CountryInterface } from '../../types';

interface CountriesProps {
  searchCountries: CountryInterface[];
  clickShowButton: (country: CountryInterface) => void;
  searchName: string;
}

const Countries = ({
  searchCountries,
  clickShowButton,
  searchName,
}: CountriesProps) => {
  if (0 < searchCountries.length && searchCountries.length <= 10) {
    return (
      <List>
        {searchCountries.map((country) => (
          <ListItem disablePadding key={country.name.common} sx={{ m: 1 }}>
            <ListItemIcon>
              <Flag
                flag={country.flags.svg}
                name={country.name.common}
                flagWidth={30}
              />
            </ListItemIcon>
            {country.name.common}
            <Button
              onClick={() => clickShowButton(country)}
              variant="outlined"
              sx={{ ml: 2 }}
              size="small"
            >
              show
            </Button>
          </ListItem>
        ))}
      </List>
    );
  } else if (searchName === '') {
    return <Alert severity="info">Please enter country's name</Alert>;
  } else if (searchCountries.length > 10 || searchName === '') {
    return (
      <Alert severity="warning">Too many matches, specify another filter</Alert>
    );
  }
  return <Alert severity="error">No matches</Alert>;
};

export default Countries;

