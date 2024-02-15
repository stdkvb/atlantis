'use client';
import { useState, useRef, useEffect } from 'react';
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

  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '-450px' }
    );
    console.log(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      ref.current
        .querySelectorAll('.page__background_temporary')
        .forEach((el) => {
          setTimeout(() => {
            el.classList.remove('show');
          }, 1000);
          setTimeout(() => {
            el.classList.add('hide');
          }, 2000);
        });
    } else {
      ref.current
        .querySelectorAll('.page__background_temporary')
        .forEach((el) => {
          setTimeout(() => {
            el.classList.add('show');
          }, 1000);
          setTimeout(() => {
            el.classList.remove('hide');
          }, 2000);
        });
    }
  }, [isIntersecting]);

  return (
    <section className='page swiper-page swiper-page_wide' ref={ref}>
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
      <svg
        className='page__background page__background_temporary'
        width='1920'
        height='1080'
        viewBox='0 0 1920 1080'
        preserveAspectRatio='xMinYMin slice'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M743.335 1080L1247.64 0H0V1080H743.335ZM1920 1008.02V0H1448.58L1920 1008.02ZM1514.52 833.236H1182.48L1348.97 478.521L1514.52 833.236Z'
          fill='#273C55'
        />
      </svg>

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
