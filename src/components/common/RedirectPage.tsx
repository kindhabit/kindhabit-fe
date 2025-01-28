import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  to: string;
  delay?: number;
}

export const RedirectPage: React.FC<Props> = ({ to, delay = 0 }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate(to, { replace: true });
    }, delay);
    
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate, to, delay]);

  return null;
}; 