'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Project = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/project',
    fetcher
  );

  return (
    <section className='page swiper-page swiper-page_wide'>
      {/* <svg
        className='page__background page__background_temporary'
        width='1215.000000'
        height='1300.000000'
        viewBox='0 0 1215 1300'
        fill='#273c55'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          id='Vector'
          d='M1215 1300L0 1300L607.032 0L1215 1300ZM441.479 1048.24L773.522 1048.24L607.968 693.521L441.479 1048.24Z'
          fill='transparent'
          fill-opacity='1.000000'
          fill-rule='nonzero'
        />
      </svg> */}

      <Swiper
        className='page__swiper'
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          type: 'fraction',
        }}
      >
        {data &&
          !isLoading &&
          data.data.afterScrollElements.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                className='page__background page__background_zoom'
                src={'https://атлантис.рф' + item.imgUrl}
                fill={true}
                alt='photo'
              />
              <div className='container'>
                <h1>{item.title}</h1>
                <p>{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Project;
