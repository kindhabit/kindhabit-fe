import { useState, useEffect } from 'react';
import { FormSupplementState } from '@/services/kindhabit/supplement';

export const useSupplementForm = () => {
  const [supplementForm] = useState(() => new FormSupplementState());
  const [state, setState] = useState(supplementForm.getState());

  useEffect(() => {
    const unsubscribe = supplementForm.subscribe(newState => {
      setState(newState);
    });

    supplementForm.initialize();

    return () => {
      unsubscribe();
    };
  }, [supplementForm]);

  return state;
}; 