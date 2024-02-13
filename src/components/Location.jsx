'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import useSWR from 'swr';
import Modal from 'react-modal';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const points = [
  {
    id: 0,
    title: 'Парк-50-летия',
    icon: 'url("/images/point.svg")',
    left: `51%`,
    top: `31%`,
  },
  {
    id: 1,
    title: 'Яй',
    icon: 'url("/images/point.svg")',
    left: `36%`,
    top: `24%`,
  },

  {
    id: 2,
    title: 'Центральный',
    icon: 'url("/images/point.svg")',
    left: `13%`,
    top: `51%`,
  },
  {
    id: 3,
    title: 'Мир',
    icon: 'url("/images/point.svg")',
    left: `75%`,
    top: `21%`,
  },
  {
    id: 4,
    title: 'Уфа-Арена',
    icon: 'url("/images/point.svg")',
    left: `11%`,
    top: `35%`,
  },
  {
    id: 5,
    title: 'Парк-Якутова',
    icon: 'url("/images/point.svg")',
    left: `4%`,
    top: `34%`,
  },
  {
    id: 6,
    title: 'Ласточка',
    icon: 'url("/images/point.svg")',
    left: `19%`,
    top: `39%`,
  },
  {
    id: 7,
    title: 'Солнечный-круг',
    icon: 'url("/images/point.svg")',
    left: `27%`,
    top: `45%`,
  },
  {
    id: 8,
    title: '№1',
    icon: 'url("/images/point.svg")',
    left: `59%`,
    top: `53%`,
  },
  {
    id: 9,
    title: 'ТинькоффХолл',
    icon: 'url("/images/point.svg")',
    left: `42%`,
    top: `43%`,
  },
];

const Location = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/location',
    fetcher
  );

  //data for gallery
  const objects = data && !isLoading && data.data.objects;

  //scroll base point into view
  useEffect(() => {
    document.getElementById('base').scrollIntoView();
  }, []);

  //modal control
  const [isOpen, setIsOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(null);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '2',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      borderRadius: '0',
      border: 'none',
    },
  };

  const onModalOpen = (point) => {
    setIsOpen(true);
    setCurrentPoint(point);
  };

  const onModalClose = () => {
    setIsOpen(false);
    setCurrentPoint(null);
  };

  //swiper control
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className='page location'>
      <div className='location__wrapper'>
        <div className='location__map'>
          <div
            className='location__background'
            style={{
              backgroundImage: `url(/images/map-desktop.png)`,
            }}
          ></div>
          <img
            className='location__background-mobile'
            src='images/map-desktop.png'
          />
          <div
            className='location__base'
            id='base'
            style={{
              backgroundImage: `url("/images/base.svg")`,
            }}
          ></div>
          {points.map((point) => (
            <div
              key={point.id}
              onClick={() => onModalOpen(objects[`${point.id}`])}
              id={point.title}
              className='location__point'
              style={{
                backgroundImage: `${point.icon}`,
                left: `${point.left}`,
                top: `${point.top}`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className='location__text'>
        <h1>{data && !isLoading && data.data.title}</h1>
        <p>{data && !isLoading && data.data.additionalText}</p>
        <div className='location__numbers'>
          <div className='location__number'>
            <h3>20 мин</h3>
            <span>до центра</span>
          </div>
          <div className='location__number'>
            <h3>40 мин</h3>
            <span>до аэропорта</span>
          </div>
          <div className='location__number'>
            <h3>5 мин</h3>
            <span>до парка Кашкадан</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='gallery__close' onClick={onModalClose}>
          Вернуться
        </div>
        <div className='gallery'>
          <div className='container'>
            <h2>{currentPoint && currentPoint.title}</h2>
            {currentPoint && currentPoint.description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: currentPoint && currentPoint.description,
                }}
              ></p>
            )}
          </div>
          <Swiper
            className='gallery__swiper'
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              type: 'fraction',
            }}
          >
            {currentPoint &&
              currentPoint.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img src={'https://grandavenue.ru' + image} alt='photo' />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Modal>
    </section>
  );
};

export default Location;
