'use client';
import { useContext } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { SectionContext } from './SectionProvider';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/main',
    fetcher
  );
  // console.log(data);

  return (
    <section className='page welcome'>
      {/* <Image
        fill={true}
        className='page__background page__background_zoom'
        src={data && !isLoading && 'https://grandavenue.ru' + data.data.fileUrl}
        alt='photo'
      /> */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className='page__background'
        src={data && !isLoading && 'https://grandavenue.ru' + data.data.fileUrl}
        // src='videos/video.mp4'
        alt='background video'
      ></video>
      <img width='100%' src='images/logo-text.svg' alt='logo' />
      <div className='container'>
        <h1>{data && !isLoading && data.data.title}</h1>
      </div>
    </section>
  );
};

export default Home;
