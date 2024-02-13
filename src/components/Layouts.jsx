'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import 'swiper/css/pagination';
import Form from '@/src/components/Form';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Layouts = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/layouts',
    fetcher
  );

  // console.log(data);

  //modal control
  const [isOpen, setIsOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      maxWidth: '93%',
    },
  };

  const [activeView, setActiveView] = useState(0);
  const [modalActiveView, setModalActiveView] = useState(activeView);

  const onModalOpen = (layout) => {
    // console.log(layout);
    setIsOpen(true);
    setCurrentLayout(layout);
    // console.log(currentLayout);
    setModalActiveView(activeView);
  };

  const onModalClose = () => {
    setIsOpen(false);
    setCurrentLayout(null);
    setModalActiveView(0);
  };

  //filter control
  const [activeIndex, setActiveIndex] = useState(0);

  //views
  const views = ['схема', 'сверху', 'сбоку'];

  //gallery control
  const galleryStyles = {
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const onGalleryOpen = (layout) => {
    setIsGalleryOpen(true);
    setCurrentLayout(layout);
  };

  const onGalleryClose = () => {
    setIsGalleryOpen(false);
    setCurrentLayout(null);
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
    <section className='layouts'>
      <div className='container container_narrow'>
        <div className='layouts__title'>
          <h2>Планировки</h2>
          <div className='layouts__description'>
            <p>{data && !isLoading && data.data.additionalText}</p>
          </div>
        </div>
        <div className='layouts__filter'>
          <span className='layouts__subtitle'>Тип квартиры:</span>
          <div className='layouts__filter-list'>
            {data &&
              !isLoading &&
              data.data.layouts.map((layout, i) => (
                <span
                  className={
                    activeIndex === i
                      ? 'button button_secondary button_small active'
                      : 'button button_secondary button_small'
                  }
                  key={layout.id}
                  onClick={() => setActiveIndex(i)}
                >
                  {layout.name}
                </span>
              ))}
          </div>
        </div>
        {data &&
          !isLoading &&
          data.data.layouts.map((layout, i) => (
            <div
              className={
                activeIndex === i
                  ? 'layouts__content active'
                  : 'layouts__content'
              }
              key={layout.id}
            >
              <div className='layouts__column'>
                <div className='layouts__image'>
                  <img
                    src={
                      'https://grandavenue.ru' +
                      ((activeView === 0 && layout.viewsImageUrl.schema) ||
                        (activeView === 1 && layout.viewsImageUrl.top) ||
                        (activeView === 2 && layout.viewsImageUrl.side))
                    }
                    alt='layout'
                    onClick={() => onModalOpen(layout)}
                  />
                  <Image
                    className='layouts__zoom'
                    src='images/zoom.svg'
                    width={150}
                    height={150}
                    alt='zoom'
                    onClick={() => onModalOpen(layout)}
                  />
                </div>
                <div className='layouts__views'>
                  <span className='layouts__subtitle'>Вид:</span>
                  {views.map((item, i) => (
                    <span
                      className={
                        activeView === i
                          ? 'button button_secondary button_small active'
                          : 'button button_secondary button_small'
                      }
                      key={item}
                      onClick={() => setActiveView(i)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className='layouts__column'>
                <div className='layouts__text'>
                  <h3>{layout.fullName}</h3>
                  <div className='layouts__info'>
                    <div className='layouts__info-item'>
                      <span className='layouts__subtitle'>Срок сдачи:</span>
                      <span>{layout.term}</span>
                    </div>
                    <div className='layouts__info-item'>
                      <span className='layouts__subtitle'>Площадь:</span>
                      <span>{layout.area}</span>
                    </div>
                    <div className='layouts__info-item'>
                      <span className='layouts__subtitle'>Кв. № :</span>
                      <span>{layout.flatNumber}</span>
                    </div>
                    <div className='layouts__info-item'>
                      <span className='layouts__subtitle'>Этаж:</span>
                      <span>{layout.stage}</span>
                    </div>
                  </div>
                  <p>{layout.description}</p>
                </div>
                <div className='layouts__buttons'>
                  <span className='button' onClick={() => setIsFormOpen(true)}>
                    Узнать стоимость
                  </span>
                  {data && !isLoading && layout.link && (
                    <Link
                      href={data && !isLoading && layout.link}
                      className='button button_secondary'
                      target='_blank'
                    >
                      3D-тур
                    </Link>
                  )}
                  <span
                    className='button button_secondary'
                    onClick={() => onGalleryOpen(layout)}
                  >
                    Вид из окон
                  </span>
                </div>
              </div>
            </div>
          ))}

        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className='modal modal_layouts'>
            <div className='modal__views'>
              <span className='layouts__subtitle'>Вид:</span>
              {views.map((item, i) => (
                <span
                  className={
                    modalActiveView === i
                      ? 'button button_black-border button_small active'
                      : 'button button_black-border button_small'
                  }
                  key={item}
                  onClick={() => setModalActiveView(i)}
                >
                  {item}
                </span>
              ))}
            </div>
            <img
              className='modal__image'
              src={
                'https://grandavenue.ru' +
                ((modalActiveView === 0 &&
                  currentLayout &&
                  currentLayout.viewsImageUrl.schema) ||
                  (modalActiveView === 1 &&
                    currentLayout &&
                    currentLayout.viewsImageUrl.top) ||
                  (modalActiveView === 2 &&
                    currentLayout &&
                    currentLayout.viewsImageUrl.side))
              }
              alt='layout'
            />
            <Image
              className='modal__close'
              src={'/images/close-modal_black.svg'}
              width={24}
              height={24}
              alt='close'
              onClick={onModalClose}
            />
          </div>
        </Modal>
        <Modal
          isOpen={isFormOpen}
          onRequestClose={() => setIsFormOpen(false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <div className='modal'>
            <h3>Узнать стоимость</h3>
            <Form inModal={true} path={'price'} />
            <Image
              className='modal__close'
              src={'/images/close-modal_black.svg'}
              width={24}
              height={24}
              alt='close'
              onClick={() => setIsFormOpen(false)}
            />
          </div>
        </Modal>
        <Modal
          isOpen={isGalleryOpen}
          onRequestClose={onGalleryClose}
          style={galleryStyles}
          ariaHideApp={false}
        >
          <div className='gallery__close' onClick={onGalleryClose}></div>
          <div className='gallery'>
            <div className='container'>
              <h1>
                Лучшие виды
                <br />в городе
              </h1>
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
              {currentLayout &&
                currentLayout.windowViewsUrl.map((image) => (
                  <SwiperSlide key={image.id}>
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
                {currentLayout &&
                  currentLayout.windowViewsUrl.map((image) => (
                    <SwiperSlide key={image.id}>
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
      </div>
    </section>
  );
};

export default Layouts;
