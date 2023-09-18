import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import './swiper-bundle.css';

function MypageStyleSlide() {
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
      className='w-full'
    >
      <div className="flex items-center w-[90%] mx-auto">
        <div className="flex flex-col justify-center w-[90%] mx-auto">
          <div className="swiper-container flex w-full whitespace-no-wrap overflow-hidden">
            <div className="swiper-wrapper">
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">hip</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide-holder keyword flex justify-center items-center px-3 py-1.5 w-[7.625rem] rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">lovely</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">vintage</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">casual</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">classic</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">funk</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">preppy</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">amekaji</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">cityboy</span>
              </SwiperSlide>
              <SwiperSlide
                tabIndex="0"
                className="swiper-custom-slide keyword flex justify-center items-center px-3 py-1.5 rounded-3xl bg-white border border-solid border-black"
              >
                <span className="text-sm leading-base">athleisure</span>
              </SwiperSlide>
            </div>
          </div>
        </div>
      </div>
    </Swiper>
  );
}

export default MypageStyleSlide;
