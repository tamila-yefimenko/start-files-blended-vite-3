import { useEffect, useState, useRef } from 'react';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import { fetchCountry } from '../service/countryApi';
import { useLocation, useParams } from 'react-router-dom';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);

  const { countryId } = useParams();

  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/country');

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        const country = await fetchCountry(countryId);
        setCountry(country);
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
      }
    };
    getCountryInfo();
  }, []);

  return (
    <Section>
      <Container>
        <GoBackBtn prevPage={goBackRef.current}></GoBackBtn>
        {error && (
          <p>Sorry, we don't have any information about this country</p>
        )}
        <CountryInfo country={country} />
      </Container>
    </Section>
  );
};

export default Country;
