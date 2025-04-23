import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import SearchForm from '../components/SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getCountry = async () => {
      if (!query) {
        setCountries([]);
        return;
      }
      try {
        const countries = await fetchByRegion(query);
        setCountries(countries);
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
      }
    };
    getCountry();
  }, [query]);

  const handleSubmit = value => {
    if (!value || value === 'default') {
      searchParams.delete('query');
      setSearchParams(searchParams);
      return setSearchParams(searchParams);
    }
    searchParams.set('query', value);
    setSearchParams(searchParams);
  };

  return (
    <Section>
      <Container>
        <Heading title="SearchCountry" bottom />
        <SearchForm onSubmit={handleSubmit} />
        <CountryList countries={countries} />
        {error && <p>Sorry, we don't have any information about this region</p>}
      </Container>
    </Section>
  );
};

export default SearchCountry;
