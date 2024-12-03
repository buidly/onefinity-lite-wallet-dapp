import { createContext } from 'react';

interface ChainContextType {
  mainAddress: string | undefined;
  mvxAddressFromApi: string | undefined;
  evmAddressFromApi: string | undefined;
  balance: string;
  evmAccount: string | null;
  evmConnect: () => Promise<void>;
  evmDisconnect: () => void;
  showTransactionToast: (hash: string) => Promise<void>;
}

export const ChainContext = createContext<ChainContextType | undefined>(
  undefined
);
