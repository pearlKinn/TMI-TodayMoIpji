import pb from '@/api/pocketbase';
import ProfileUpload from '@/components/ProfileUpload/ProfileUpload';
import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
import useFetchData from '@/hooks/useFetchData';
import useStorage from '@/hooks/useStorage';
import { useEffect, useState } from 'react';
import S from './UserProfileEdit.module.css';

const PB = import.meta.env.VITE_PB_URL;
const PB_USER_ENDPOINT = `${PB}/api/collections/users/records`;

function UserProfileEdit() {
  const { data: userData, isLoading } = useFetchData(PB_USER_ENDPOINT);
  const [nickname, setNickname] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [usernames, setUsername] = useState([]);
  const { storageData: pocketbaseAuthData } = useStorage('pocketbase_auth');

  useEffect(() => {
    if (userData.items) {
      const usernames = userData.items.map((user) =>
        user.username.toLowerCase()
      );
      setUsername(usernames);
    }
  }, [userData.items]);

  const handleCheckDuplicate = () => {
    if (isLoading) {
      return;
    }

    if (
      nickname.length >= 2 &&
      nickname.length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(nickname)
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
    if (
      value.length >= 2 &&
      value.length <= 10 &&
      /^[a-zA-Z0-9]+$/.test(value)
    ) {
      setNickname(value);
      setValidationResult('');
    } else {
      setNickname(value);
      setValidationResult('2 ~ 10글자의 영문 대소문자와 숫자만 입력하세요.');
    }
  };

  const handleButtonClick = () => {
    if (!isLoading) {
      handleCheckDuplicate();
    }
  };

  const updateUsernameOnServer = async () => {
    try {
      const response = await pb
        .collection('users')
        .update(pocketbaseAuthData.id, {
          username: nickname,
        });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('서버 요청 오류:', error);
      return false;
    }
  };

  const username =
    pocketbaseAuthData?.model?.username || '사용자 이름이 없습니다';
  if (pocketbaseAuthData) {
    return (
      <div className={S.profile}>
        <UserProfilePicture avatar={pocketbaseAuthData?.model} />
        <div className="h-[90px] flex">
          <span className="mt-5 text-xl font-semibold">{username}</span>
        </div>

        <div className={S.editwrapper}></div>
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
                className={S.nick}
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
                /^[a-zA-Z0-9]+$/.test(nickname)
                  ? 'bg-primary'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={
                isLoading ||
                !(
                  nickname.length >= 2 &&
                  nickname.length <= 10 &&
                  /^[a-zA-Z0-9]+$/.test(nickname)
                )
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
                pocketbaseAuthData.username = nickname;
              } else {
                console.error('서버에서 username 업데이트 실패');
              }
            }
          }}
          className={S.save}
          disabled={isLoading || validationResult !== '사용가능'}
        >
          저장하기
        </button>
      </div>
    );
  }
}

export default UserProfileEdit;
