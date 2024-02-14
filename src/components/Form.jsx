'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { usePathname } from 'next/navigation';
import { MaskedInput, createDefaultMaskGenerator } from 'react-hook-mask';

const Form = ({ inModal, path }) => {
  //success modal control
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
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

  //phone mask
  const maskGenerator = createDefaultMaskGenerator('+7 (999) 999 99 99');

  //form validation
  const [name, setName] = useState('');
  const [shortPhone, setShortPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, shortPhone]);

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Введите ваше имя';
    }

    if (!shortPhone) {
      errors.shortPhone = 'Введите номер телефона';
    }

    if (shortPhone.length < 10 && shortPhone.length !== 0) {
      errors.shortPhone = 'Введите номер телефона полностью';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // form submit
  const handleSubmit = () => {
    if (isFormValid) {
      const phone = '+7' + shortPhone;
      //fetch data
      fetch(`${'https://атлантис.рф/api/form/' + path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      });

      // console.log('Form submitted successfully!');
      setName('');
      setShortPhone('');

      //open succsess modal
      setIsSuccessOpen(true);
    } else {
      // console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <>
      <div className={!inModal ? 'form form_contacts' : 'form form_modal'}>
        <div className='form__name'>
          <div className={!name ? 'input' : 'input valid'}>
            <input
              className={!inModal ? '' : 'input_black'}
              type='text'
              placeholder='Ваше имя'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className='input__error'>{errors.name}</p>}
          </div>
        </div>
        <div className='form__phone'>
          <div className={shortPhone.length !== 10 ? 'input' : 'input valid'}>
            <MaskedInput
              className={!inModal ? '' : 'input_black'}
              placeholder='Ваш телефон'
              maskGenerator={maskGenerator}
              value={shortPhone}
              onChange={setShortPhone}
            />
            {errors.shortPhone && (
              <p className='input__error'>{errors.shortPhone}</p>
            )}
          </div>
        </div>
        <div className='form__policy'>
          <span>Отправляя форму, вы соглашаетесь с </span>
          <Link href={'/policy'} className='link' target='_blank'>
            условиями обработки личных данных
          </Link>
        </div>
        <button
          className={
            isFormValid
              ? 'button button_blue form__submit'
              : 'button button_disabled form__submit'
          }
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Отправить
        </button>
      </div>
      <Modal
        isOpen={isSuccessOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='modal'>
          <h3>Успешно!</h3>
          <span className='modal__message'>
            Ваша заявка отправлена.
            <br />
            Мы свяжемся с вами
            <br /> в ближайшее время.
          </span>
          <button
            className='modal__button button button_blue'
            onClick={() => setIsSuccessOpen(false)}
          >
            отлично!
          </button>
          <Image
            className='modal__close'
            src={'/images/close-modal_black.svg'}
            width={24}
            height={24}
            alt='close'
            onClick={() => setIsSuccessOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default Form;
