import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import useStorage from '@/hooks/useStorage';
import pb from '@/api/pocketbase';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper-bundle.css';

function MypageSievingSlide(userId) {
  const { storageData } = useStorage('pocketbase_auth');
  const [token, setToken] = useState(storageData?.token);
  useEffect(() => {
    setToken(storageData?.token);
  });

  const mypageUserId = userId.item;
  console.log('mypageUserId:', mypageUserId);
  console.log('token:', token);

  const handleButtonClick = async (userId, value) => {
    await pb.collection('users').update(userId, {
      bodyType: value,
    });
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
                <SwiperSlide
                  tabIndex="0"
                  className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
                >
                  <button
                    type="button"
                    className="text-sm leading-base"
                    onClick={() => handleButtonClick(mypageUserId, '하체발달')}
                  >
                    하체발달
                  </button>
                </SwiperSlide>
                <SwiperSlide
                  tabIndex="0"
                  className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
                >
                  <button
                    type="button"
                    className="text-sm leading-base"
                    onClick={() => handleButtonClick(mypageUserId, '상체발달')}
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
