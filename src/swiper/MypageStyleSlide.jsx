import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import './swiper-bundle.css';

function MypageStyleSlide(userId) {
  const mypageUserId = userId.item;
  const [selectedStylesValue, setSelectedStylesValue] = useState([]);

  const handleStyleClick = (userId, value) => {
    setSelectedStylesValue((prevSelectedStyles) => {
      const updatedStyles = [...prevSelectedStyles, value];
      console.log('selectedStylesValue:', updatedStyles);
      return updatedStyles;
    });
     // setSelectedStyles((prevSelectedStyles) => [...prevSelectedStyles, value]);
    
    localStorage.setItem('userId', userId);
      localStorage.setItem('userStyleValue', selectedStylesValue);

  };

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
      className="w-full"
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
                  onClick={() => handleStyleClick(mypageUserId, 'hip')}
                >
                  hip
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'lovely')}
                >
                  lovely
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'vintage')}
                >
                  vintage
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'casual')}
                >
                  casual
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'classic')}
                >
                  classic
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'funk')}
                >
                  funk
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'preppy')}
                >
                  preppy
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'amekaji')}
                >
                  amekaji
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'cityboy')}
                >
                  cityboy
                </button>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'athleisure')}
                >
                  athleisure
                </button>
              </SwiperSlide>
            </div>
          </div>
        </div>
      </div>
    </Swiper>
  );
}

export default MypageStyleSlide;
