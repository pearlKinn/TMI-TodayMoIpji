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

    const storedUserStyleValue = localStorage.getItem('userStyleValue');
    const parsedStoredUserStyleValue = storedUserStyleValue
      ? new Set(JSON.parse(storedUserStyleValue))
      : new Set();

    if (!parsedStoredUserStyleValue.has(value)) {
      parsedStoredUserStyleValue.add(value);
      localStorage.setItem(
        'userStyleValue',
        JSON.stringify(Array.from(parsedStoredUserStyleValue))
      );
    }

    localStorage.setItem('userId', userId);
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
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'hip')}
                  aria-label="힙합 스타일"
                >
                  <span aria-hidden="true">hip</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'lovely')}
                  aria-label="러블리 스타일"
                >
                  <span aria-hidden="true">lovely</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'vintage')}
                  aria-label="빈티지 스타일"
                >
                  <span aria-hidden="true">vintage</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'casual')}
                  aria-label="캐주얼 스타일"
                >
                  <span aria-hidden="true">casual</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'classic')}
                  aria-label="클래식 스타일"
                >
                  <span aria-hidden="true">classic</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'funk')}
                  aria-label="펑크 스타일"
                >
                  <span aria-hidden="true">funk</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'preppy')}
                  aria-label="프레피 스타일"
                >
                  <span aria-hidden="true">preppy</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'amekaji')}
                  aria-label="아메카지 스타일"
                >
                  <span aria-hidden="true">amekaji</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'cityboy')}
                  aria-label="도시남자 스타일"
                >
                  <span aria-hidden="true">cityboy</span>
                </button>
              </SwiperSlide>
              <SwiperSlide className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black">
                <button
                  type="button"
                  className="text-sm leading-base"
                  onClick={() => handleStyleClick(mypageUserId, 'athleisure')}
                  aria-label="애슬레저 스타일"
                >
                  <span aria-hidden="true">athleisure</span>
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
