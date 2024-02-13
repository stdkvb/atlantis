'use client';

import { useCallback, useRef } from 'react';

export const useThrottle = (delay, cb) => {
  const ref = useRef(null);

  return useCallback(
    (...args) => {
      // console.log(ref.current, 'current', Date.now())
      if (ref.current) return;

      ref.current = setTimeout(() => {
        ref.current = false;
      }, delay);

      cb(...args);
    },
    [delay, cb]
  );
};
