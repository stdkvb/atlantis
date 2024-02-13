'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Infrastructure = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/infrastructure',
    fetcher
  );
  // console.log(data);

  return (
    <section className='page swiper-page swiper-page_wide'>
      <Swiper
        className='page__swiper'
        modules={[Navigation, Scrollbar]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {data &&
          !isLoading &&
          data.data.elements.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                className='page__background page__background_zoom'
                src={'https://grandavenue.ru' + item.fileUrl}
                fill={true}
                alt='photo'
              />
              <div className='container'>
                <p>{item.previewText}</p>
                <h1>{item.title}</h1>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Infrastructure;
