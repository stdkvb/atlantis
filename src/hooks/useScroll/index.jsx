`use client`;

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const useScroll = (ready, setReady) => {
  const ref = useRef(null);
  const router = useRouter();
  const path = usePathname();

  const handleScroll = (event) => {
    if (path == '/') {
      if (event.deltaY > 0) {
        router.push('/project');
        onAnimationStart();
      }
    }

    if (path == '/project') {
      if (event.deltaY < 0) {
        router.push('/');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/location');
        onAnimationStart();
      }
    }

    if (path == '/location') {
      if (event.deltaY < 0) {
        router.push('/project');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/architecture');
        onAnimationStart();
      }
    }

    if (path == '/architecture') {
      if (event.deltaY < 0) {
        router.push('/location');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/infrastructure');
        onAnimationStart();
      }
    }

    if (path == '/infrastructure') {
      if (event.deltaY < 0) {
        router.push('/architecture');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/layouts');
        onAnimationStart();
      }
    }

    if (path == '/layouts') {
      if (event.deltaY < 0) {
        router.push('/infrastructure');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/parking');
        onAnimationStart();
      }
    }

    if (path == '/parking') {
      if (event.deltaY < 0) {
        router.push('/layouts');
        onAnimationStart();
      }

      if (event.deltaY > 0) {
        router.push('/contacts');
        onAnimationStart();
      }
    }

    if (path == '/contacts') {
      if (event.deltaY < 0) {
        router.push('/parking');
        onAnimationStart();
      }
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   window.addEventListener('wheel', handleScroll);
    //   return () => window.removeEventListener('wheel', handleScroll);
    // }, 2000);

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const onAnimationStart = () => {
    if (ref.current) return;
    setReady(false);
    const animationDuration = 2000;
    // console.log('animation');
    ref.current = setTimeout(() => {
      setReady(true);
      ref.current = null;
    }, animationDuration);
  };
};
