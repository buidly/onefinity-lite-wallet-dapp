import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';
import { ReactNode, useMemo } from 'react';
import { ChainContext } from './GlobalContext';
import { useLocalStorage } from 'helpers';
import { RouteNamesEnum } from 'localConstants';
import { useNavigate } from 'react-router-dom';
import { Address } from '@multiversx/sdk-core/out';
import { useTrackTransactions } from 'hooks/useTrackTransactions';
import useGetMetamaskAccount from 'hooks/useGetMetamaskAccount/useGetMetamaskAccount';
import { useGetAccountFromApi } from 'lib';
import { addressIsBech32 } from 'utils/address.utils';

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { address } = useGetAccount();
  const { showTransactionToast } = useTrackTransactions();
  const [evmAccount, setEvmAccount] = useLocalStorage<string | null>(
    `metamask_account`,
    null
  );
  const { disconnect: evmDisconnect, getAccount: evmConnect } =
    useGetMetamaskAccount(
      (account) => {
        setEvmAccount(account);
        navigate(RouteNamesEnum.dashboard);
      },
      () => {
        setEvmAccount(null);
        navigate(RouteNamesEnum.unlock);
      }
    );

  const mainAddress = useMemo(() => {
    console.log({ evmAccount, address });
    if (evmAccount) {
      return evmAccount;
    }

    if (!address) {
      return undefined;
    }

    const oneAddress = Address.newFromBech32(address);
    return oneAddress.bech32();
  }, [address, evmAccount]);

  const { data } = useGetAccountFromApi(mainAddress);

  const { mvxAddressFromApi, evmAddressFromApi } = useMemo(() => {
    if (addressIsBech32(mainAddress)) {
      return {
        mvxAddressFromApi: mainAddress,
        evmAddressFromApi: data?.evmAddress
      };
    }

    return {
      mvxAddressFromApi: data?.address,
      evmAddressFromApi: mainAddress
    };
  }, [mainAddress, data]);

  const value = {
    mainAddress,
    evmConnect,
    evmAccount,
    mvxAddressFromApi,
    evmAddressFromApi,
    balance: data?.balance ?? '0',
    evmDisconnect,
    showTransactionToast
  };

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};
