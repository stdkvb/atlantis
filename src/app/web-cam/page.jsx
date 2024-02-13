'use client';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const WebCam = () => {
  //get data
  const { data, error, isLoading } = useSWR(
    'https://grandavenue.ru/api/web-cam',
    fetcher
  );
  // console.log(data);

  return (
    <section className='web-cam'>
      <div className='container'>
        <h1>
          Онлайн
          <br />
          трансляция
        </h1>
        <div className='web-cam__list'>
          {data &&
            !isLoading &&
            data.data.map((cam, i) => (
              <div className='web-cam__item' key={i}>
                <div className='web-cam__video'>
                  <iframe
                    allowFullScreen={true}
                    scrolling='no'
                    width='100%'
                    height='100%'
                    src={cam.videoUrl}
                    allow='autoplay'
                  ></iframe>
                </div>
                <h5>{cam.title}</h5>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WebCam;
