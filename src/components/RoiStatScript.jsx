'use client';
import Script from 'next/script';

const RoiStatScript = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        type='text/javascript'
        src='scripts/roistatscript.js'
        async
      />
    </>
  );
};

export default RoiStatScript;
