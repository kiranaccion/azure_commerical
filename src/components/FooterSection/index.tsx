'use client';

import React from 'react';
import Footer from '../Footer';
import { usePathname } from 'next/navigation';

const FooterSection = () => {
  const pathName = usePathname();

  return pathName !== '/search' && <Footer />;
};

export default FooterSection;
