import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import S from './Heading.module.css';

function Heading() {
  return (
    <div className={S.headingWrapper}>
      <h1 className={S.headerBar}>
        <Link to='/'>
          <Logo size={60} />
        </Link>
      </h1>
    </div>
  );
}

export default Heading;
