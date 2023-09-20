import { Logo } from '../Logo';
import Text from '/TMI-Text.svg';
import S from './Loading.module.css';
import LoadingSpinner from '../LoadingSpinner';

function Loading() {
  return (
    <div className={S.loadingSection}>
      <div className={S.logoWrapper}>
        <Logo />
        <img src={Text} />
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default Loading;
