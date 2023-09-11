import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

function SignIn() {
  return (
    <>
      <div className="flex items-center justify-center pt-[123px] pb-[22px]">
        <img className="mx-auto" src="/public/logo.svg" />
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-[250px] h-[128px] flex flex-col items-center justify-center">
          <div>
            <Input
              type="email"
              placeholder="아이디를 입력해주세요"
              width="w-[250px]"
              height="h-[42px]"
            />
          </div>
          <div className="py-3">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              width="w-[250px]"
              height="h-[42px]"
            />
            <ul className="flex justify-end pt-3 w-[250px] h-5 text-xs text-gray700">
              <li>아이디 찾기</li>
              <li className="text-primary">ㅣ</li>
              <li>비밀번호 찾기</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-[10px]">
        <button
          type="submit"
          className="flex w-[230px] h-[34px] bg-yellow rounded-xl text-[15px] pl-2 py-[5px]"
          title="카카오 계정으로 로그인하는 버튼입니다"
          // onClick={() => {}}
        >
          <img className="w-6 h-6" src="/public/mdi-chat.svg" />
          카카오 계정으로 로그인하기
        </button>
      </div>
      <div>
        <Button
          text="로그인"
          title="로그인 버튼입니다"
          width="w-[250px]"
          height="h-[54px]"
          fontsize="text-base"
          fontcolor="text-gray900"
          bgcolor="bg-primary"
        />
      </div>
      <div className="py-3">
        <Button
          text="회원가입"
          title="회원가입 버튼입니다"
          width="w-[250px]"
          height="h-[54px]"
          fontsize="text-base"
          fontcolor="text-primary"
          bgcolor="bg-white"
          border="border-primary"
        />
      </div>
    </>
  );
}

export default SignIn;
