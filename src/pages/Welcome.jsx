import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import S from './Welcome.module.css';
import celebration from '/celebration-icon.svg';
function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="h-[calc(100vh-132px)]">
        <div className={S.welcomeContainer}>
          <img className="mx-auto" src={celebration} />
        </div>
        <p className="text-base text-center">회원 가입을 축하합니다!</p>
        <div className={S.loginButton}>
          <Button
            text="로그인 하기"
            title="로그인 버튼입니다"
            width="w-[250px]"
            height="h-[54px]"
            fontsize="text-base"
            fontcolor="text-gray900"
            bgcolor="bg-primary"
            onClick={handleLogin}
          />
        </div>
      </div>
    </>
  );
}

export default Welcome;
