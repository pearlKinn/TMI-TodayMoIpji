import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swiper-bundle.css';

function MypageSievingSlide() {
  const [appleValue, setAppleValue] = useState('');
  const [peerValue, setPeerValue] = useState('');
  const [rectangValue, setRectangleValue] = useState('');
  const [hourglassValue, setHourglassValue] = useState('');

  const handleButtonClick = (value) => {
    setAppleValue(value);
    setPeerValue(value);
    setRectangleValue(value);
    setHourglassValue(value);
  };

  console.log(appleValue);
  console.log(peerValue);
  console.log(rectangValue);
  console.log(hourglassValue);

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
                  onClick={() => handleButtonClick('애플형')}
                >
                  애플형
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleButtonClick('피어형')}
                >
                  피어형
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleButtonClick('삼각형형')}
                >
                  삼각형형
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleButtonClick('직사각형')}
                >
                  직사각형
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleButtonClick('모래시계형')}
                >
                  모래시계형
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
