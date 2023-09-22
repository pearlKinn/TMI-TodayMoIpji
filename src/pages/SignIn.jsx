import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import useAuthStore from '@/store/auth';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import ChatIcon from '/mdi-chat.svg';
import toast from 'react-hot-toast';

function SignIn() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // 회원가입 페이지로 이동
  const handleSignUp = () => {
    navigate('/signup');
  };

  // signIn(로그인) 기능
  const signIn = useAuthStore((state) => state.signIn);
  const isValidForm = formState.email !== '' && formState.password !== '';

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      toast.error('아이디 혹은 비밀번호를 확인해주세요', {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
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
      <div className="h-[calc(100vh-132px)]">
        <h2 className="sr-only">로그인 페이지</h2>
        <div className="flex items-center justify-center pt-[57px] pb-[22px]">
          <img className="mx-auto" src={logo} />
        </div>
        <form onSubmit={handleSignIn}>
          <div className="flex items-center justify-center">
            <div className="w-[250px] h-[128px] flex flex-col items-center justify-center">
              <div>
                <label htmlFor="inputId" className="sr-only">
                  아이디 입력 공간
                </label>
                <Input
                  id="userEmail"
                  type="email"
                  name="email"
                  value={formState.email}
                  placeholder="아이디를 입력해주세요"
                  width="w-[250px]"
                  height="h-[42px]"
                  onChange={handleInput}
                />
              </div>
              <div className="py-3">
                <label htmlFor="inputPassword" className="sr-only">
                  비밀번호 입력 공간
                </label>
                <Input
                  id="userPassword"
                  type="password"
                  name="password"
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
              type="button"
              className="flex w-[230px] h-[34px] bg-yellow rounded-xl text-[15px] pl-2 py-[5px]"
              title="카카오 계정으로 로그인하는 버튼"
            >
              <img className="w-6 h-6" src={ChatIcon} />
              카카오 계정으로 로그인하기
            </button>
          </div>
          <div>
            <Button
              text="로그인"
              title="로그인 버튼"
              type="button"
              width="w-[250px]"
              height="h-[54px]"
              fontcolor={isValidForm ? 'text-gray900' : 'text-white'}
              bgcolor={isValidForm ? 'bg-primary' : 'bg-gray750'}
              disabled={!isValidForm}
            />
          </div>
          <div className="py-3">
            <Button
              text="회원가입"
              title="회원가입 버튼"
              type="submit"
              width="w-[250px]"
              height="h-[54px]"
              fontcolor="text-primary"
              bgcolor="bg-white"
              border="border-primary"
              onClick={handleSignUp}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
