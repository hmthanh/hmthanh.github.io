'use client'; // Mark this as a client component

import { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const FancyboxWrapper = ({ children }) => {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', {
      // Your custom options
    });

    return () => {
      NativeFancybox.unbind('[data-fancybox]');
      NativeFancybox.close();
    };
  }, []);

  return <>{children}</>;
};

export default FancyboxWrapper;
