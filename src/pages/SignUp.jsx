import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useState, useCallback } from 'react';
import useAuthStore from '@/store/auth';
import debounce from '@/utils/debounce';
import { useNavigate } from 'react-router-dom';
import { emailReg, pwReg, userNameReg } from '@/utils/validation';
import pb from '@/api/pocketbase';

function SignUp() {
  // signUp(회원가입) 기능
  const [formState, setFormState] = useState({
    email: '',
    userName: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();

  const signUp = useAuthStore((state) => state.signUp);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, userName, password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signUp({
        email: email,
        nickname: userName,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      console.log('회원가입 성공');
      navigate('/welcome');
    } catch (error) {
      console.error(error.message);
      alert('입력한 내용을 확인해주세요');
    }
  };

  // 성능개선 debounce 기능
  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  const [checkEmail, setCheckEmail] = useState(false);

  // email, password, userName validation기능
  const isValidForm =
    formState.email !== '' &&
    formState.password !== '' &&
    formState.passwordConfirm !== '' &&
    formState.password === formState.passwordConfirm &&
    checkEmail;

  const validateEmail = (email) => {
    return emailReg(email);
  };
  const validatePassword = (password) => {
    return pwReg(password);
  };
  const validateUserName = (userName) => {
    return userNameReg(userName);
  };

  const [emailMsg, setEmailMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
  const [userNameMsg, setUserNameMsg] = useState('');

  const isEmailValid = validateEmail(formState.email);
  const isPasswordValid = validatePassword(formState.password);
  const isConfirmPasswordValid =
    formState.password === formState.passwordConfirm;
  const isUserNameValid = validateUserName(formState.userName);

  const onChangeEmail = useCallback(async (e) => {
    const currentEmail = e.target.value;

    if (!validateEmail(currentEmail)) {
      setEmailMsg('이메일 형식이 올바르지 않습니다.');
      setCheckEmail(false);
    } else {
      setEmailMsg('올바른 이메일 형식입니다.');
      setCheckEmail(true);
    }
  }, []);

  const onChangePassword = useCallback(
    (e) => {
      const currentPassword = e.target.value;

      if (!validatePassword(currentPassword)) {
        setPasswordMsg('영문, 숫자, 특수기호 조합으로 8자이상 입력해주세요.');
      } else {
        setPasswordMsg('안전한 비밀번호입니다.');
      }
      if (currentPassword !== formState.passwordConfirm) {
        setConfirmPasswordMsg('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmPasswordMsg('비밀번호가 일치합니다.');
      }
    },
    [formState.passwordConfirm]
  );

  const onChangeConfirmPassword = useCallback(
    (e) => {
      const currentConfirmPassword = e.target.value;

      if (!validatePassword(currentConfirmPassword)) {
        setConfirmPasswordMsg('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmPasswordMsg('올바른 비밀번호입니다.');
      }
      if (currentConfirmPassword !== formState.password) {
        setConfirmPasswordMsg('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmPasswordMsg('비밀번호가 일치합니다.');
      }
    },
    [formState.password]
  );

  const onChangeUserName = useCallback((e) => {
    const currentUserName = e.target.value;

    if (/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(currentUserName)) {
      setUserNameMsg('한글 입력은 불가능합니다.');
    } else if (!validateUserName(currentUserName)) {
      setUserNameMsg('2자 이상 10자 이하로 입력해주세요.');
    } else {
      setUserNameMsg('올바른 닉네임 형식입니다.');
    }
  }, []);

  // email 중복체크기능
  const onCheckEmail = async (e) => {
    e.preventDefault();

    try {
      const emailSameList = await pb.collection('users').getList(1, 50, {
        filter: `email='${formState.email}'`,
      });

      if (emailSameList.items.find((item) => item.email === formState.email)) {
        setEmailMsg('이미 등록된 메일주소입니다.🚫');
        setCheckEmail(false);
      } else {
        setEmailMsg('사용 가능한 메일주소입니다.😊');
        setCheckEmail(true);
      }
    } catch (err) {
      console.log(`이메일 중복검사 에러 내용: ${err}`);
    }
  };

  return (
    <>
      <div style={{ height: '585px' }}>
        <h2 className="sr-only">회원가입 페이지</h2>
        <form onSubmit={handleSignUp}>
          <div className="flex items-center justify-center pt-[57px]">
            <div className="w-[250px] h-[128px] flex flex-col">
              <p className="text-xs pl-2 pb-1">이메일</p>
              <div className="flex w-[265px] space-x-1 items-center justify-center pb-6">
                <label htmlFor="inputEmail" className="sr-only">
                  이메일 입력 공간
                </label>
                <div className="relative flex flex-col">
                  <Input
                    placeholder="인증 가능한 이메일 주소"
                    width="w-[186px]"
                    height="h-[42px]"
                    name="email"
                    value={formState.email}
                    onChange={(e) => {
                      handleInput(e);
                      onChangeEmail(e);
                    }}
                  />
                  <p
                    className={`absolute pointer-events-none pt-11 text-[10px] font-bold ${
                      isEmailValid && checkEmail
                        ? 'text-infoCorrect'
                        : 'text-infoError'
                    }`}
                  >
                    {emailMsg}
                  </p>
                </div>
                <Button
                  text="중복확인"
                  title="이메일 중복확인 버튼입니다"
                  type="button"
                  width="w-[62px]"
                  height="h-[42px]"
                  fontcolor="text-gray900"
                  fontsize="text-xs"
                  bgcolor="bg-primary"
                  onClick={onCheckEmail}
                />
              </div>
              <div className="relative flex flex-col">
                <p className="text-xs pl-2 pb-1">닉네임</p>
                <p className="text-[4px] text-blue-600 pl-2 pb-1">
                  * 닉네임 미입력시 랜덤으로 생성됩니다.
                </p>
                <div className="flex w-[265px] space-x-1 items-center justify-center pb-6">
                  <label htmlFor="inputUserName" className="sr-only">
                    닉네임 입력 공간
                  </label>
                  <div className="relative flex flex-col">
                    <Input
                      placeholder="2~10문자 영문, 숫자(특수문자 사용불가)"
                      width="w-[250px]"
                      height="h-[42px]"
                      name="userName"
                      value={formState.userName}
                      onChange={(e) => {
                        handleInput(e);
                        onChangeUserName(e);
                      }}
                    />
                    <p
                      className={`absolute pointer-events-none pt-11 text-[10px] font-bold ${
                        isUserNameValid ? 'text-infoCorrect' : 'text-infoError'
                      }`}
                    >
                      {userNameMsg}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs pl-2 pb-1">비밀번호</p>
              <div className="flex w-[265px] space-x-1 items-center justify-center pb-6">
                <label htmlFor="inputPassword" className="sr-only">
                  비밀번호 입력 공간
                </label>
                <div className="relative flex flex-col">
                  <Input
                    placeholder="비밀번호를 입력해주세요"
                    width="w-[250px]"
                    height="h-[42px]"
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={(e) => {
                      handleInput(e);
                      onChangePassword(e);
                    }}
                  />
                  <p
                    className={`absolute pointer-events-none pt-11 text-[10px] font-bold ${
                      isPasswordValid ? 'text-infoCorrect' : 'text-infoError'
                    }`}
                  >
                    {passwordMsg}
                  </p>
                </div>
              </div>
              <p className="text-xs pl-2 pb-1">비밀번호 확인</p>
              <div className="flex w-[265px] space-x-1 items-center justify-center pb-6">
                <label htmlFor="inputPasswordConfirm" className="sr-only">
                  비밀번호 재입력 공간
                </label>
                <div className="relative flex flex-col">
                  <Input
                    placeholder="비밀번호를 다시 입력해주세요"
                    width="w-[250px]"
                    height="h-[42px]"
                    type="password"
                    name="passwordConfirm"
                    value={formState.passwordConfirm}
                    onChange={(e) => {
                      handleInput(e);
                      onChangeConfirmPassword(e);
                    }}
                  />
                  <p
                    className={`absolute pointer-events-none pt-11 text-[10px] font-bold ${
                      isConfirmPasswordValid
                        ? 'text-infoCorrect'
                        : 'text-infoError'
                    }`}
                  >
                    {confirmPasswordMsg}
                  </p>
                </div>
              </div>
              <div className="flex w-[265px] items-center justify-center pt-6">
                <Button
                  text="회원가입 하기"
                  title="회원가입 버튼입니다"
                  type="submit"
                  width="w-[250px]"
                  height="h-[54px]"
                  fontsize="text-base"
                  fontcolor={isValidForm ? 'text-gray900' : 'text-white'}
                  bgcolor={isValidForm ? 'bg-primary' : 'bg-gray750'}
                  disabled={!isValidForm}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
