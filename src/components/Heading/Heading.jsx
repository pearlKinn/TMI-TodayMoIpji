import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import S from './Heading.module.css';
import Degree from '/degree.svg';

function Heading() {
  return (
    <div className={S.headingWrapper}>
      <h1 className={S.headerBar}>헤더</h1>
      <Link to="/">
        <Logo size={60} />
      </Link>
      <Link to="/suggestion">
        <img src={Degree} alt="온도" />
      </Link>
    </div>
  );
}

export default Heading;
