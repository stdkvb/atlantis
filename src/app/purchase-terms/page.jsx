'use client';
import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import useSWR from 'swr';

import Form from '@/src/components/Form';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PurchaseTerms = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/purchase-terms',
    fetcher
  );
  // console.log(data);

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
      <section className='purchase-terms'>
        <div className='container'>
          <h2>Условия покупки</h2>
          <div
            className='button'
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Оставить заявку
          </div>
          <ul className='purchase-terms__list'>
            {data &&
              !isLoading &&
              data.data.elements.map((item, i) => (
                <li key={i} className='purchase-terms__item'>
                  <div>
                    <span>Банк</span>
                    <img
                      src={'https://grandavenue.ru' + item.imageUrl}
                      alt='logo'
                    />
                  </div>
                  <div>
                    <span>Ставка</span>
                    <h5>{item.rate}</h5>
                  </div>
                  <div>
                    <span>Первый взнос</span>
                    <h5>{item.downPayment}</h5>
                  </div>
                  <div>
                    <span>Срок</span>
                    <h5>{item.term}</h5>
                  </div>
                  <div>
                    <span>Ежемесячный&nbsp;платеж</span>
                    <h5>{item.monthlyPayment}</h5>
                  </div>
                </li>
              ))}
          </ul>
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

export default PurchaseTerms;
