import { useContext } from 'react';
import { ChainContext } from './GlobalContext';

export const useGlobalContext = () => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within app');
  }
  return context;
};
