import React, { useEffect } from 'react';

export function useOutsideAlerter(ref: React.RefObject<HTMLElement>, callBack: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        callBack();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
