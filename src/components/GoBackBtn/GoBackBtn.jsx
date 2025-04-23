import { Link } from 'react-router-dom';
import css from './GoBackBtn.module.css';
const GoBackBtn = ({ prevPage }) => {
  return (
    <Link to={prevPage} className={css.link}>
      GoBackBtn
    </Link>
  );
};

export default GoBackBtn;
