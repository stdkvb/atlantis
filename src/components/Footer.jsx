'use client';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://атлантис.рф/api/contacts',
    fetcher
  );
  // console.log(data);

  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='footer__column'>
          <h3>Вы можете связаться с нами по почте или телефону</h3>
          <div className='footer__links'>
            <div>
              <img src='/images/phone-square.svg' alt='phone' />
              <Link
                href={`${data && !isLoading && 'tel:' + data.data.phone}`}
                className='link'
              >
                {data && !isLoading && data.data.phone}
              </Link>
            </div>
            <div>
              <img src='/images/mail-square.svg' alt='mail' />
              <Link
                href={`${data && !isLoading && 'mailto:' + data.data.email}`}
                className='link'
              >
                {data && !isLoading && data.data.email}
              </Link>
            </div>
          </div>
        </div>
        <div className='footer__column'>
          <h3>Или через наши офисы продаж</h3>
          <div className='footer__links'>
            <div>
              <img src='/images/location-square.svg' alt='location' />
              <span>{data && !isLoading && data.data.address}</span>
            </div>
            <div>
              <img src='/images/clock-square.svg' alt='clock' />
              <span>{data && !isLoading && data.data.schedule}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='footer__bottom'>
        <span>© 2024. Все права защищены.</span>
        <Link href={'https://wptt.ru'} className='link'>
          Разработка — вебпространство
        </Link>
        <Link href={'/policy'} className='link' target='_blank'>
          Политика конфиденциальности
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
