import React from 'react';

export function useEscapeKey(func) {
  React.useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.code === 'Escape')
        func();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [func]);
}