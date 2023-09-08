import React from 'react';
import Button from './components/Button/Button';

function SignIn() {
  return (
    <div>
      <div className="input_wrapper w-[250px] h-[128px] items-center justify-center">
        <div className="flex flex-col">
          <input
            id="userEmail"
            type="email"
            placeholder="아이디를 입력해주세요"
            className="px-5 w-[250px] h-[42px] border-primary border-solid border rounded"
          ></input>
        </div>
        <div className="flex-col py-3">
          <input
            id="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="px-5 w-[250px] h-[42px] border-primary border-solid border rounded"
          ></input>
          <ul className="flex justify-end pt-3 w-[160px] h-5 text-xs text-gray700">
            <li>아이디 찾기</li>
            <li className="text-primary">ㅣ</li>
            <li>비밀번호 찾기</li>
          </ul>
        </div>
      </div>
      <div>
        <Button>로그인</Button>
      </div>
      <div className="py-3">
        <Button>회원가입</Button>
      </div>
    </div>
  );
}

export default SignIn;
