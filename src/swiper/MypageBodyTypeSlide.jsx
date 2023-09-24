import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import useStorage from '@/hooks/useStorage';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper-bundle.css';

function MypageSievingSlide(userId) {
  const { storageData } = useStorage('pocketbase_auth');
  const [token, setToken] = useState(storageData?.token);
  const [authUserData, setAuthUserData] = useState(storageData?.model);
  useEffect(() => {
    setToken(storageData?.token);
    setAuthUserData(storageData?.model);
  });

  const mypageUserId = userId.item;

  const handleBodyTypeClick = async (userId, value) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userBodyTypeValue', value);
  };

  if (token) {
    return (
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEI: '.swiper-button-next',
          prevEI: '.swiper-button-prev',
          clickable: true,
        }}
        mousewheelControl={true}
      >
        <div className="flex items-center w-[90%] mx-auto">
          <div className="flex flex-col justify-center w-[90%] mx-auto">
            <div className="swiper-container flex w-full whitespace-no-wrap overflow-hidden">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                  <button
                    type="button"
                    className="text-sm leading-base"
                    onClick={() =>
                      handleBodyTypeClick(mypageUserId, '하체발달')
                    }
                  >
                    하체발달
                  </button>
                </SwiperSlide>
                <SwiperSlide className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black">
                  <button
                    type="button"
                    className="text-sm leading-base"
                    onClick={() =>
                      handleBodyTypeClick(mypageUserId, '상체발달')
                    }
                  >
                    상체발달
                  </button>
                </SwiperSlide>
              </div>
            </div>
          </div>
        </div>
      </Swiper>
    );
  }
}

export default MypageSievingSlide;
