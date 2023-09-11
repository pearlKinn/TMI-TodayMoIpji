import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';

function SignUp() {
  return (
    <>
      <div className="flex items-center justify-center pt-[123px]">
        <div className="w-[250px] h-[128px] flex flex-col">
          <p className="text-xs pl-2 pb-1">이메일</p>
          <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
            <Input
              placeholder="인증 가능한 이메일 주소"
              width="w-[186px]"
              height="h-[42px]"
            />
            <Button
              text="중복확인"
              title="이메일 중복확인 버튼입니다"
              width="w-[62px]"
              height="h-[42px]"
              fontcolor="text-white"
              fontsize="text-xs"
              bgcolor="bg-primary"
            />
          </div>
          <p className="text-infoError text-[10px] font-bold pl-2 py-1">
            이메일을 양식에 맞게 입력해주세요
          </p>
          <p className="text-xs pl-2 pb-1">닉네임</p>
          <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
            <Input
              placeholder="2~8문자(특수문자 사용불가)"
              width="w-[186px]"
              height="h-[42px]"
            />
            <Button
              text="랜덤생성"
              title="닉네임 랜덤생성 버튼입니다"
              width="w-[62px]"
              height="h-[42px]"
              fontcolor="text-white"
              fontsize="text-xs"
              bgcolor="bg-primary"
            />
          </div>
          <p className="text-infoError text-[10px] font-bold pl-2 py-1">
            중복된 닉네임입니다
          </p>
          <p className="text-xs pl-2 pb-1">비밀번호</p>
          <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
            <Input
              placeholder="2~8문자(특수문자 사용불가)"
              width="w-[250px]"
              height="h-[42px]"
            />
          </div>
          <p className="text-infoError text-[10px] font-bold pl-2 py-1">
            비밀번호를 양식에 맞게 입력해주세요
          </p>
          <p className="text-xs pl-2 pb-1">비밀번호 확인</p>
          <div className="flex flex-row w-[265px] space-x-1 items-center justify-center">
            <Input
              placeholder="2~8문자(특수문자 사용불가)"
              width="w-[250px]"
              height="h-[42px]"
            />
          </div>
          <p className="text-infoError text-[10px] font-bold pl-2 py-1">
            비밀번호가 일치하지 않습니다
          </p>
          <div className="flex w-[265px] items-center justify-center pt-6">
            <Button
              text="회원가입 하기"
              title="회원가입 버튼입니다"
              width="w-[250px]"
              height="h-[54px]"
              fontsize="text-base"
              fontcolor="text-white"
              bgcolor="bg-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
