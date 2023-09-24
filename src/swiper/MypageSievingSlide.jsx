import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper-bundle.css';

function MypageSievingSlide(userId) {
const mypageUserId = userId.item;
  const handleSievingClick = async (userId, value) => {
    console.log('userSievingId:', userId);
    console.log('userSievingValue:', value);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userSievingValue', value);
  };

  return (
    <Swiper
      modules={[A11y]}
      spaceBetween={30}
      slidesPerView={2}
      mousewheelControl={true}
    >
      <div className="flex items-center w-[90%] mx-auto">
        <div className="flex flex-col justify-center w-[90%] mx-auto">
          <div className="swiper-container flex w-full whitespace-no-wrap overflow-hidden">
            <div className="swiper-wrapper">
              <SwiperSlide
                tabIndex={0}
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() =>
                    handleSievingClick(mypageUserId, '더위 많이 탐')
                  }
                >
                  더위 많이 탐
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex={0}
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() =>
                    handleSievingClick(mypageUserId, '추위 많이 탐')
                  }
                >
                  추위 많이 탐
                </button>
              </SwiperSlide>
            </div>
          </div>
        </div>
      </div>
    </Swiper>
  );
}

export default MypageSievingSlide;
