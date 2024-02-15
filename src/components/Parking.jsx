'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Parking = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/parking',
    fetcher
  );
  // console.log(data);

  return (
    <section className='page swiper-page swiper-page_wide'>
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
          data.data.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                className='page__background page__background_zoom'
                src={'https://атлантис.рф' + item.fileUrl}
                fill={true}
                alt='photo'
              />
              <div className='container'>
                <h1>{item.title}</h1>
                {item.text && <p>{item.text}</p>}

                {item.btnLink && (
                  <Link
                    href={`${item.btnLink}`}
                    target='_blank'
                    className='button button_secondary'
                  >
                    Выбрать место
                  </Link>
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Parking;
