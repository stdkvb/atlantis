'use client';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/contacts',
    fetcher
  );
  // console.log(data);

  return (
    <footer className='footer'>
      <Link
        href={`${data && !isLoading && 'tel:' + data.data.phone}`}
        className='footer__phone link'
      >
        {data && !isLoading && data.data.phone}
      </Link>
      <Link
        href={`${data && !isLoading && 'mailto:' + data.data.email}`}
        className='footer__mail link'
      >
        {data && !isLoading && data.data.email}
      </Link>
      <div className='footer__row'>
        <div className='footer__office'>
          <span>Офис продаж:</span>
          <span>{data && !isLoading && data.data.address}</span>
          <span>{data && !isLoading && data.data.schedule}</span>
        </div>
        <Link
          href={`${data && !isLoading && data.data.document.url}`}
          className='link'
          download={
            (data && !isLoading && data.data.document.type) == 'file'
              ? true
              : false
          }
          target='_blank'
        >
          <Image src='images/document.svg' width={50} height={50} alt='viber' />
          Список разрешительной документации — ДОМ.РФ
        </Link>
      </div>
      <div className='footer__socials'>
        <Link href={`${data && !isLoading && data.data.links.viber}`}>
          <Image src='images/viber.svg' width={40} height={40} alt='viber' />
        </Link>
        <Link href={`${data && !isLoading && data.data.links.vk}`}>
          <Image src='images/vk.svg' width={40} height={40} alt='vk' />
        </Link>
        <Link href={`${data && !isLoading && data.data.links.tg}`}>
          <Image
            src='images/telegram.svg'
            width={40}
            height={40}
            alt='telegram'
          />
        </Link>
        <Link href={`${data && !isLoading && data.data.links.wa}`}>
          <Image
            src='images/whatsapp.svg'
            width={40}
            height={40}
            alt='whatsapp'
          />
        </Link>
      </div>
      <div className='footer__bottom'>
        <span>© 2023. Все права защищены.</span>
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
