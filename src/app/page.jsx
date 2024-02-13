'use client';
import React, { useContext } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css/effect-creative';

import { SectionContext } from '../components/SectionProvider';

import Home from '../components/Home';
import Project from '../components/Project';
import Location from '../components/Location';
import Architecture from '../components/Architecture';
import Infrastructure from '../components/Infrastructure';
import Layouts from '../components/Layouts';
import Parking from '../components/Parking';
import Contacts from '../components/Contacts';
import { SwiperWatcher } from '../components/SwiperWatcher';

const Page = () => {
  const { section } = useContext(SectionContext);

  return (
    <Swiper
      className='page page-swiper'
      modules={[Mousewheel]}
      spaceBetween={1000}
      slidesperview='1'
      mousewheel={true}
      direction='vertical'
      speed='2000'
      initialSlide={section}
    >
      <SwiperSlide>
        <Home />
      </SwiperSlide>
      <SwiperSlide>
        <Project />
      </SwiperSlide>
      <SwiperSlide>
        <Location />
      </SwiperSlide>
      <SwiperSlide>
        <Architecture />
      </SwiperSlide>
      <SwiperSlide>
        <Infrastructure />
      </SwiperSlide>
      <SwiperSlide>
        <Layouts />
      </SwiperSlide>
      <SwiperSlide>
        <Parking />
      </SwiperSlide>
      <SwiperSlide>
        <Contacts />
      </SwiperSlide>
      <SwiperWatcher />
    </Swiper>
  );
};

export default Page;
