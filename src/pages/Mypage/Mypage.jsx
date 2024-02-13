import pb from '@/api/pocketbase';
import { MypageIcon } from '@/assets/MypageIcon';
import Loading from '@/components/Loading/Loading';
import MyItem from '@/components/MyItem/MyItem';
import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
import useStorage, { getData } from '@/hooks/useStorage';
import MypageBodyTypeSlide from '@/swiper/MypageBodyTypeSlide';
import MypageSievingSlide from '@/swiper/MypageSievingSlide';
import MypageStyleSlide from '@/swiper/MypageStyleSlide';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GuestSetting from '../GuestSetting';
import S from './Mypage.module.css';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user`;

async function fetchProducts() {
  const response = await axios(PB_FEED_ENDPOINT);
  return await response.data;
}

function Mypage() {
  // const {
  //   storedUserSievingValue,
  //   storedUserStyleValue,
  //   storedBodyTypeValue,
  //   isDisabled,
  //   updateIsDisabled,
  // } = useBodyTypeStore();

  const { userId } = useParams();

  const [showPosts, setShowPosts] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setAuthUserData(storageData?.model);
  }, [storageData]);

  function toggleDarkModeHandler() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  const {
    isLoading,
    data: postData,
    error,
  } = useQuery(['posts'], () => fetchProducts(), {
    retry: 2,
  });

  let dataItems = postData?.items;

  const storedUserSievingValue = getData('userSievingValue')?.replace(
    /\s/g,
    ''
  );
  const storedUserStyleValue = getData('userStyleValue');
  const storedBodyTypeValue = getData('userBodyTypeValue');

  const handleSaveClick = async () => {
    await pb.collection('users').update(userId, {
      sieving:
        storedUserSievingValue !== null
          ? storedUserSievingValue
          : authUserData?.sieving,
      style:
        storedUserStyleValue !== null
          ? storedUserStyleValue
          : authUserData?.style,
      bodyType:
        storedBodyTypeValue !== null
          ? storedBodyTypeValue
          : authUserData?.bodyType,
    });
  };

  // useEffect(() => {
  //   updateIsDisabled();
  // }, [
  //   storedUserSievingValue,
  //   storedUserStyleValue,
  //   storedBodyTypeValue,
  //   updateIsDisabled,
  // ]);

  useEffect(() => {
    if (storedUserSievingValue || storedUserStyleValue || storedBodyTypeValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [storedUserSievingValue, storedUserStyleValue, storedBodyTypeValue]);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );

  if (!authUserData) return <GuestSetting />;

  return (
    <div className={S.mypageWrapper}>
      <div className="w-full flex flex-col items-center ">
        <div className="flex justify-center">
          {authUserData.avatar === '' ? (
            <span className="border border-gray500 rounded-full">
              <MypageIcon size={64} />
            </span>
          ) : (
            <UserProfilePicture avatar={authUserData} name={authUserData} />
          )}
        </div>
        <span>{authUserData.username ? authUserData.username : '닉네임'}</span>
        <Link
          to={`/useredit/${userId}`}
          className="w-[6.625rem] h-[2.875rem] flex justify-center items-center rounded-lg bg-primary mb-8"
        >
          프로필 수정
        </Link>
      </div>
      <div className="w-full h-[1.5rem] flex items-center mb-3 border-t-2 border-black">
        <button
          className={`w-1/2 flex justify-center ${
            showPosts ? 'bg-white' : 'bg-secondary text-white'
          }`}
          onClick={() => {
            setShowPosts(true);
            setShowSettings(false);
          }}
        >
          게시물 보기
        </button>

        <button
          className={`w-1/2 flex justify-center ${
            showSettings ? 'bg-white' : 'bg-secondary text-white'
          }`}
          onClick={() => {
            setShowSettings(true);
            setShowPosts(false);
          }}
        >
          설정 및 정보수정
        </button>
      </div>
      {showPosts && (
        <div className={S.mypageInfo}>
          {dataItems?.map((item) => (
            <MyItem key={item.id} item={item} />
          ))}
        </div>
      )}
      {showSettings && (
        <div className="flex flex-col p-8 overflow-y-scroll min-w-[320px]">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between">
              <span className="w-[5.25rem] h-[2.75rem] flex justify-center items-center rounded-3xl bg-black text-white mb-[1.6rem] font-bold">
                다크모드
              </span>
              <div className={`${S.toggleBtn} ${isDarkMode ? S.on : S.off}`}>
                <button
                  className={`${S.circle}`}
                  onClick={toggleDarkModeHandler}
                ></button>
              </div>
            </div>
            <div className={`${S.bodyTypeWrapper}`}>
              <MypageStyleSlide item={userId} />
            </div>
            <div className={`${S.bodyTypeWrapper} gap-2`}>
              <span className={S.bodyType}>체질</span>
              <MypageSievingSlide item={userId} />
            </div>
            <div className={`${S.bodyTypeWrapper} flex-nowrap gap-2`}>
              <span className={S.bodyType}>체형</span>
              <MypageBodyTypeSlide item={userId} />
            </div>
            <button
              className={`w-[17.5rem] h-[3.375rem] flex justify-center items-center rounded-md ${
                isDisabled ? 'bg-gray-700 text-white' : 'bg-primary'
              }`}
              onClick={() => handleSaveClick()}
              disabled={isDisabled}
            >
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;
