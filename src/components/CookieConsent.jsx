'use client';

import React from 'react';
import { hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';

const CookieConsent = (props) => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie('localConsent', 'true', {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='cookie'>
      <div className='cookie__wrapper'>
        <span>
          продолжая использовать наш сайт, вы даете согласие на обработку файлов
          cookie и соглашаетесь с{' '}
          <Link href={'/policy'} target='_blank'>
            политикой обработки персональны данных
          </Link>
        </span>
        <button
          className='button button_blue button_small'
          onClick={() => acceptCookie()}
        >
          ok
        </button>
      </div>
    </div>
  );
};

export { CookieConsent };
