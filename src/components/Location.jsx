'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useSWR from 'swr';
import Modal from 'react-modal';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const points = [
  {
    id: 0,
    title: 'Кашкадан',
    icon: 'url("/images/point.svg")',
    left: `18%`,
    top: `40%`,
  },
];

const Location = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/location',
    fetcher
  );

  //data for gallery
  const objects = data && !isLoading && data.data.objects;

  //scroll base point into view on mobile
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
            src='images/map-mobile.png'
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
          {data &&
            !isLoading &&
            data.data.benefits.map((item) => (
              <div key={item.id} className='location__number'>
                <h3>{item.mainText}</h3>
                <span>{item.smallText}</span>
              </div>
            ))}
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
            <h1>{currentPoint && currentPoint.title}</h1>
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
                  <img src={'https://атлантис.рф' + image} alt='photo' />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Modal>
    </section>
  );
};

export default Location;
