'use client';
import { useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

import Form from '@/src/components/Form';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HowToBuy = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/how-to-buy',
    fetcher
  );
  // console.log(data);

  //tabs controller
  const [activeTab, setActiveTab] = useState(50);

  //modal control
  const [isOpen, setIsOpen] = useState(false);
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
      width: '93%',
      maxWidth: '490px',
    },
  };

  return (
    <>
      <section className='how-to-buy'>
        <div className='container'>
          <div>
            <h2>Как купить</h2>
            <div className='how-to-buy__tabs'>
              {data &&
                !isLoading &&
                data.data.elements.map((item) => (
                  <div
                    className={activeTab === item.id ? 'link active' : 'link'}
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>
          {data &&
            !isLoading &&
            data.data.elements.map((item) => (
              <div
                key={item.id}
                className='how-to-buy__content'
                style={activeTab !== item.id ? { display: 'none' } : {}}
              >
                <img src={'https://атлантис.рф' + item.imageUrl} alt='photo' />
                <h3>{item.text}</h3>
                <p>{item.smallText}</p>
                {item.title === 'Ипотека' ? (
                  <Link href='/purchase-terms' className='button button_blue'>
                    Рассчитать ипотеку
                  </Link>
                ) : (
                  <span
                    className='button button_blue'
                    onClick={() => setIsOpen(true)}
                  >
                    Оставить заявку
                  </span>
                )}
              </div>
            ))}
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='modal'>
          <h3>Оставить заявку</h3>
          <Form inModal={true} path={'question'} />
          <Image
            className='modal__close'
            src={'/images/close-modal_black.svg'}
            width={24}
            height={24}
            alt='close'
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default HowToBuy;
