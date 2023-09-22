import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
// import UserNickname from '@/components/UserNickname/UserNickname';
// import EditPageButton from '@/components/EditPageButton/EditPageButton';
import ProfileUpload from '@/components/ProfileUpload/ProfileUpload';
import { useState, useEffect } from 'react';
import useFetchData from '@/hooks/useFetchData';
import useStorage from '@/hooks/useStorage';
import pb from '@/api/pocketbase';

const PB = import.meta.env.VITE_PB_URL;
const PB_USER_ENDPOINT = `${PB}/api/collections/users/records`;

function UserProfileEdit() {
  const { error, data: userData, isLoading } = useFetchData(PB_USER_ENDPOINT);
  const [nickname, setNickname] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [usernames, setUsername] = useState([]);
  const { storageData: loggedInUser } = useStorage('loggedInUser');
  useEffect(() => {
    if (userData.items) {
      const usernames = userData.items.map((user) =>
        user.username.toLowerCase()
      );
      setUsername(usernames);
    }
  }, [userData.items]);
  console.log(userData.items);
  const handleCheckDuplicate = () => {
    if (isLoading) {
      return;
    }

    // const avatar = loggedInUser?.avatar || '사용자 아바타 이미지 URL이 없습니다'; // 아바타 이미지가 없는 경우 기본값 사용
    if (
      nickname.length >= 2 &&
      nickname.length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(nickname) // 영문 대소문자와 숫자만 허용
    ) {
      const isDuplicate = usernames.includes(nickname.toLowerCase());

      if (isDuplicate) {
        setValidationResult('중복');
      } else {
        setValidationResult('사용가능');
      }
    } else {
      setValidationResult('2 ~ 10글자의 영문 대소문자와 숫자만 입력하세요.');
    }
  };

  const handleNicknameChange = (value) => {
    // 닉네임 입력값 길이 검사
    if (
      value.length >= 2 &&
      value.length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(value) // 영문 대소문자와 숫자만 허용
    ) {
      setNickname(value);
      setValidationResult(''); // 길이 조건을 만족하면 경고 메시지를 지움
    } else {
      setNickname(value);
      setValidationResult('2 ~ 10글자의 영문 대소문자와 숫자만 입력하세요.');
    }
  };

  const handleButtonClick = () => {
    if (!isLoading) {
      // 데이터 로딩 중이 아닌 경우에만 중복 확인 실행
      handleCheckDuplicate();
    }
  };
  const updateUsernameOnServer = async () => {
    try {
      const response = await pb
        .collection('users')
        .update(loggedInUser.record.id, {
          username: nickname,
        });

      if (response.status === 200) {
        return true; // 업데이트 성공
      } else {
        return false; // 업데이트 실패
      }
    } catch (error) {
      console.error('서버 요청 오류:', error);
      return false;
    }
  };

  const username = loggedInUser?.record?.username || '사용자 이름이 없습니다';
  return (
    <div className=" md:mx-auto md:w-[768px]  pt-[25px] items-center flex flex-col">
      <UserProfilePicture />
      <div className="my-auto h-[90px] flex">
        <span>{username}</span>
      </div>

      <div className="w-full flex justify-center border-t-2 border-black"></div>
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="2 ~ 10문자(특수문자 사용불가)"
              className="w-30 h-10 rounded border border-primary text-sm p-2"
              value={nickname}
              onChange={(e) => handleNicknameChange(e.target.value)}
            />
            {validationResult && (
              <div
                className={
                  validationResult === '중복'
                    ? 'text-red-500'
                    : 'text-green-500'
                }
              >
                {validationResult}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              handleButtonClick();
            }}
            className={`h-10 text-gray-900 border rounded px-2 ${
              nickname.length >= 2 &&
              nickname.length <= 10 &&
              /^[a-zA-Z0-9]+$/.test(nickname) // 영문 대소문자와 숫자만 허용
                ? 'bg-primary'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={
              isLoading ||
              !(
                nickname.length >= 2 &&
                nickname.length <= 10 &&
                /^[a-zA-Z0-9]+$/.test(nickname)
              ) // 영문 대소문자와 숫자만 허용
            }
          >
            중복확인
          </button>
        </div>
        <ProfileUpload />
      </div>
      <button
        onClick={async () => {
          if (!isLoading && validationResult === '사용가능') {
            const isUsernameUpdated = await updateUsernameOnServer();
            if (isUsernameUpdated) {
              setUsername(nickname);
              // 성공 메시지를 표시할 수도 있습니다.
            } else {
              console.error('서버에서 username 업데이트 실패');
              // 오류 메시지를 표시할 수도 있습니다.
            }
          }
        }}
        className={`bg-primary w-1/2 mt-20 h-10 px-1 text-gray-900 rounded`}
        disabled={isLoading || validationResult !== '사용가능'}
      >
        저장하기
      </button>
    </div>
  );
}

export default UserProfileEdit;
