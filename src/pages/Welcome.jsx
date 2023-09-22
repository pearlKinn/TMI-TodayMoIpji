import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="h-[calc(100vh-132px)]">
        <div className="flex items-center justify-center pt-[57px] pb-8">
          <img className="mx-auto" src="/public/celebration-icon.svg" />
        </div>
        <p className="text-base text-center">회원 가입을 축하합니다!</p>
        <div className="flex justify-center pt-[68px]">
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
