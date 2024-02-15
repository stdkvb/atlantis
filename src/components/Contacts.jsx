'use client';
import { useState } from 'react';
import Image from 'next/image';
import Form from '@/src/components/Form';
import Footer from '@/src/components/Footer';
import Modal from 'react-modal';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Contacts = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/contacts',
    fetcher
  );

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
      <section className='page contacts'>
        <Image
          fill={true}
          className='page__background'
          src={data && !isLoading && 'https://атлантис.рф' + data.data.imgUrl}
          alt='photo'
        />
        <div className='container'>
          <h2>Остались вопросы?</h2>
          <div className='contacts__content'>
            <div className='contacts__text'>
              <p>
                Заполните форму обратной связи и наш специалист проконсультирует
                вас по возникшим вопросам
              </p>
            </div>
            <Form />
            <span
              className='contacts__button button button_secondary'
              onClick={() => setIsOpen(true)}
            >
              Заполнить форму
            </span>
          </div>
          <Footer data={data && !isLoading && data} />
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='modal'>
          <h3>Обратный звонок</h3>
          <Form inModal={true} />
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

export default Contacts;
