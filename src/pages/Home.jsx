import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useEffect, useState } from 'react';
import { getCountries } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const europe = await getCountries();
        setCountries(prevContries => [...prevContries, ...europe]);
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
      }
    };
    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        <Heading title="Home" bottom />
        <CountryList countries={countries} />
        {error && <p>Sorry, we don't have any information</p>}
      </Container>
    </Section>
  );
};
export default Home;
