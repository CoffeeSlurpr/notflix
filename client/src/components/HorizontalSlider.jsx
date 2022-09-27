import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';

function HorizontalSlider({ items }) {
  return (
    <Swiper
      loop={true}
      navigation={true}
      modules={[Navigation]}
      centeredSlides={true}
      spaceBetween={10}
      slidesPerView={'auto'}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide className="d-flex justify-content-center" key={index} style={{ width: '250px' }}>
            <img src={item} alt="" className="swiper-image" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HorizontalSlider;
