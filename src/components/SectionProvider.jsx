'use client';
import React, { createContext, useState } from 'react';

export const SectionContext = createContext(0);

const SectionProvider = ({ children }) => {
  const [section, setSection] = useState(0);

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionProvider;
