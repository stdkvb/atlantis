'use client';
import { useState } from 'react';
import Image from 'next/image';
import Form from '@/src/components/Form';
import Footer from '@/src/components/Footer';
import Modal from 'react-modal';

const Contacts = () => {
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
          src='https://s3-alpha-sig.figma.com/img/cd3d/44c4/22f89ffd2c4846ab01033b24e8a66ab0?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=okMuNv8cksvA-8nQGxZ85c0raCTNzSRQbDySeJIXQG3KmolZncyCSdSMlkxFMz8lmgAZHJY1c203GfdRi-c5VzBGRAjbBpcNL~2oBFKWkWgXSfVQWkvjlVl1tUOWqn0YWPLageTn7XPh9l9he273ASs3km7Q7VzXSTLOJ1lRzNF~zChOAj28xs16enoez9WllOQyHXiUMcjd-EgzYgPuTRtCvIEvulL~KGHRg5VytCDE5CP4TIYZL8KyT5w2j~mvV5~JYVC06gGuSzxGnMvwECbnWS3jmJHGZh-vD-TO-GryYN1TWYeArOFRzC-pTYPS79Np3ZtvpxhYp~Wvp90kZw__'
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
          <Footer />
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
