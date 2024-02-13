import { useContext, useEffect } from 'react';
import { SectionContext } from '../components/SectionProvider';
import { useSwiper } from 'swiper/react';

export const SwiperWatcher = () => {
  const { section } = useContext(SectionContext);
  const swiper = useSwiper();

  useEffect(() => {
    swiper.slideTo(section);
  }, [section]);
};
