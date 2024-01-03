export interface CountryInterface {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  currencies: {
    AUD: {
      name: string;
      symbol: string;
    };
  };
  capital: [string];
  altSpellings: [string];
  languages: {
    [key: string]: string;
  };
  latlng: [string];
  area: 135;
  flag: string;
  maps: {
    googleMaps: string;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  capitalInfo: {
    latlng: [string];
  };
}

export interface WeatherInterface {
  main: { temp: number };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
}

