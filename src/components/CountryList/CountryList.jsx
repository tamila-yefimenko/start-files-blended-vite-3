import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import { Link, useLocation } from 'react-router-dom';

const CountryList = ({ countries }) => {
  const location = useLocation();

  return (
    <div>
      <Grid>
        {countries.map(country => {
          return (
            <GridItem key={country.id}>
              <Link state={location} to={`/country/${country.id}`}>
                <img src={country.flag} alt={country.common} />
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
};
export default CountryList;
