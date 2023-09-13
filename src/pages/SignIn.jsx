import pb from '@/api/pocketbase';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useAuth } from '@/contexts/Auth';
import debounce from '@/utils/debounce';
import { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from 'zustand';

function SignIn() {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  if (isAuth) {
    return <Navigate to="/Home" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      await pb.collection('users').authWithPassword(email, password);
      navigate('/Home');
    } catch (error) {
      console.error(error);
      alert('아이디나 비밀번호를 다시 확인해주세요.');
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <>
      {/* <Helmet>
        <title>Sign In - TMI</title>
      </Helmet> */}
      <div className="flex items-center justify-center pt-[123px] pb-[22px]">
        <img className="mx-auto" src="/public/logo.svg" />
      </div>
      <form onSubmit={handleLogin} className="flex items-center justify-center">
        <div>
          <div className="w-[250px] h-[128px] flex flex-col items-center justify-center">
            <div>
              <label htmlFor="inputId" className="sr-only" />
              아이디 입력 공간
              <Input
                id="userEmail"
                type="email"
                value={formState.email}
                placeholder="아이디를 입력해주세요"
                width="w-[250px]"
                height="h-[42px]"
                onChange={handleInput}
              />
            </div>
            <div className="py-3">
              <label htmlFor="inputId" className="sr-only" />
              비밀번호 입력 공간
              <Input
                id="userPassword"
                type="password"
                value={formState.password}
                placeholder="비밀번호를 입력해주세요"
                width="w-[250px]"
                height="h-[42px]"
                onChange={handleInput}
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
            title="카카오 계정으로 로그인하는 버튼"
          >
            <img className="w-6 h-6" src="/public/mdi-chat.svg" />
            카카오 계정으로 로그인하기
          </button>
        </div>
        <div>
          <Button
            text="로그인"
            title="로그인 버튼"
            width="w-[250px]"
            height="h-[54px]"
            fontcolor="text-gray900"
            bgcolor="bg-primary"
          />
        </div>
        <div className="py-3">
          <Button
            text="회원가입"
            title="회원가입 버튼"
            width="w-[250px]"
            height="h-[54px]"
            fontcolor="text-primary"
            bgcolor="bg-white"
            border="border-primary"
          />
        </div>
      </form>
    </>
  );
}

export default SignIn;
