'use client';
import Link from 'next/link';
import React, { useState, useRef, useCallback } from 'react';
import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Modal from 'react-modal';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ConstructioProgress = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/construction-progress',
    fetcher
  );
  // console.log(data);

  //tabs controller
  const [activeTab, setActiveTab] = useState(2024);

  //modal control
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(null);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '3',
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

  const onModalOpen = (monthId) => {
    let month = data.data.list
      .find((item) => {
        return item.year === activeTab;
      })
      .months.find((item) => {
        return item.id === monthId;
      });
    setCurrentMonth(month);
    setIsOpen(true);
  };

  const onModalClose = () => {
    setIsOpen(false);
    setCurrentMonth(null);
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
    <section className='construction-progress'>
      <div className='container'>
        <div className='construction-progress__calendar'>
          <div className='construction-progress__years'>
            {data &&
              !isLoading &&
              data.data.list.map((year, i) => (
                <h5
                  key={i}
                  className={activeTab === year.year ? 'active' : ''}
                  onClick={() => setActiveTab(year.year)}
                >
                  {year.year}
                </h5>
              ))}
          </div>

          {data &&
            !isLoading &&
            data.data.list.map((year, i) => (
              <div
                key={i}
                className='construction-progress__months'
                style={activeTab !== year.year ? { display: 'none' } : {}}
              >
                {data &&
                  !isLoading &&
                  year.months.map((month) => (
                    <div
                      key={month.id}
                      className='link construction-progress__month'
                      onClick={() => onModalOpen(month.id)}
                    >
                      <span>{month.title}</span>
                      <img
                        src={'https://grandavenue.ru' + month.images[0]}
                        alt='photo'
                      />
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <Link href='/web-cam' className='construction-progress__webcam'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
          >
            <circle cx='10' cy='10' r='4' fill='white' />
            <circle
              opacity='0.8'
              cx='10'
              cy='10'
              r='6.75'
              stroke='white'
              strokeWidth='0.5'
            />
            <circle
              opacity='0.4'
              cx='10'
              cy='10'
              r='9.75'
              stroke='white'
              strokeWidth='0.5'
            />
          </svg>
          <span className='link'>Онлайн трансляция</span>
        </Link>
        <h1>Ход строительства</h1>
      </div>
      {data && !isLoading && (
        <img
          className='construction-progress__background'
          src={'https://grandavenue.ru' + data.data.img}
          alt='photo'
        />
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='gallery__close' onClick={onModalClose}></div>
        <div className='gallery'>
          <div className='container'>
            <h2>{currentMonth && currentMonth.title}</h2>
            <h2>{activeTab}</h2>
          </div>
          <Swiper
            className='gallery__swiper'
            spaceBetween={0}
            slidesPerView={1}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {currentMonth &&
              currentMonth.images.map((image, i) => (
                <SwiperSlide key={i}>
                  <img src={'https://grandavenue.ru' + image} alt='photo' />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className='gallery__preview'>
            <Swiper
              className='gallery__swiper-preview'
              ref={sliderRef}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              loop={true}
            >
              {currentMonth &&
                currentMonth.images.map((image, i) => (
                  <SwiperSlide key={i}>
                    <img src={'https://grandavenue.ru' + image} alt='photo' />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div
              className='swiper-button-prev prev-arrow'
              onClick={handlePrev}
            />
            <div
              className='swiper-button-next next-arrow'
              onClick={handleNext}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ConstructioProgress;
