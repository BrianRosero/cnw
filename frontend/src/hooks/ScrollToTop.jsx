// src/hooks/useScrollTop.jsx
import { useLayoutEffect } from 'react';

const useScrollTop = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
};

export default useScrollTop;
