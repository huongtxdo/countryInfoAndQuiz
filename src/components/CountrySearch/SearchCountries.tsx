import { TextField } from '@mui/material';

interface SearchCountriesProp {
  searchName: string;
  handleSearchName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchCountries = ({
  searchName,
  handleSearchName,
}: SearchCountriesProp) => (
  <form>
    <div>
      <TextField
        label="Enter country's name"
        value={searchName}
        onChange={handleSearchName}
      />
    </div>
  </form>
);

export default SearchCountries;

