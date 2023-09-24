import pb from '@/api/pocketbase';
import axios from 'axios';
import useStorage from '@/hooks/useStorage';
import S from './Mypage.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';
import MypageStyleSlide from '../../swiper/MypageStyleSlide';
import MypageSievingSlide from '../../swiper/MypageSievingSlide';
import MypageBodyTypeSlide from '../../swiper/MypageBodyTypeSlide';
import MyItem from '../../components/MyItem/MyItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import UserProfilePicture from '@/components/UserProfilePicture/UserProfilePicture';
import GuestSetting from '../GuestSetting';

const PB = import.meta.env.VITE_PB_URL;
const PB_FEED_ENDPOINT = `${PB}/api/collections/posts/records?expand=user`;

async function fetchProducts() {
  const response = await axios(PB_FEED_ENDPOINT);
  return await response.data;
}

function Mypage() {
  const { userId } = useParams();

  const [showPosts, setShowPosts] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const { storageData } = useStorage('pocketbase_auth');
  const [authUserData, setAuthUserData] = useState(storageData?.model);

  useEffect(() => {
    setAuthUserData(storageData?.model);
  });

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

  const handleSaveClick = async () => {
    const userId = localStorage.getItem('userId');
    const storedUserSievingValue = localStorage
      .getItem('userSievingValue')
      .replace(/\s/g, '');
    const storedUserStyleValue = JSON.parse(
      localStorage.getItem('userStyleValue')
    );
    const storedBodyTypeValue = localStorage.getItem('userBodyTypeValue');

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!authUserData) {
    return (
        <GuestSetting />
    )

  } else {
    if (postData) {
      return (
        <div className={`flex flex-col pt-5 pb-5`}>
          <div className="w-full flex flex-col items-center ">
            <div className="flex justify-center w-[3.75rem] h-[3.75rem] border-2 border-black rounded-full">
              <UserProfilePicture
                avatar={authUserData?.avatar}
                name={authUserData?.name}
              />
            </div>
            <span>닉네임</span>
            <Link
              to="/profileEdit"
              className="w-[6.625rem] h-[2.875rem] flex justify-center items-center rounded-lg bg-primary mb-8"
            >
              프로필 수정
            </Link>
          </div>
          <div className="w-full h-[1.5rem] flex items-center mb-3 border-t-2 border-black">
            <button
              className={`w-1/2 flex justify-center ${
                showPosts ? 'bg-secondary text-white' : 'bg-white'
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
                showSettings ? 'bg-secondary text-white' : 'bg-white'
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
            <div className={`flex flex-col p-8`}>
              {
                <div className="flex flex-col items-center">
                  <div className="w-full flex justify-between">
                    <span className="w-[5.25rem] h-[2.75rem] flex justify-center items-center rounded-3xl bg-black text-white mb-[1.6rem] font-bold">
                      다크모드
                    </span>
                    <div
                      className={`${S.toggleBtn} ${isDarkMode ? S.on : S.off}`}
                    >
                      <button
                        className={`${S.circle}`}
                        onClick={toggleDarkModeHandler}
                      ></button>
                    </div>
                  </div>
                  <div className="mb-[1.6rem]">
                    <MypageStyleSlide item={userId} />
                  </div>
                  <div className="w-full flex justify-between items-center mb-[1.6rem]">
                    <span className="font-bold">체질</span>
                    <MypageSievingSlide item={userId} />
                  </div>
                  <div className="w-full flex justify-between items-center mb-[7rem]">
                    <span className="font-bold">체형</span>
                    <MypageBodyTypeSlide item={userId} />
                  </div>
                  <button
                    className="w-[17.5rem] h-[3.375rem] flex justify-center items-center bg-secondary rounded-md"
                    onClick={() => handleSaveClick()}
                  >
                    저장하기
                  </button>
                </div>
              }
            </div>
          )}
        </div>
      );
    }
  }
}

export default Mypage;
