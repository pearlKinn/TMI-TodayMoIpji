import Button from '@/components/Button/Button';
import { useState } from 'react';

function Welcome() {
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <>
      <div className="flex items-center justify-center pt-[123px] pb-8">
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
          onClick={handlePopup}
        />
      </div>
      {popup && <Popup onClose={handlePopup} />}
    </>
  );
}

function Popup() {
  return (
    <div>
      <div className="modal">
        <div className="flex items-center justify-center pt-[145px] pb-[53px]">
          <img className="mx-auto" src="/public/suggest-icon.svg" />
        </div>
        <p className="text-base">
          회원만 사용할 수 있어요 &#59;&#40; 로그인하러 가시겠어요?
        </p>
      </div>
      <div className="flex justify-center pt-[40px]">
        <Button
          text="로그인 하기"
          title="로그인 버튼입니다"
          width="w-[250px]"
          height="h-[54px]"
          fontsize="text-base"
          fontcolor="text-gray900"
          bgcolor="bg-primary"
        />
      </div>
    </div>
  );
}

export default Welcome;
