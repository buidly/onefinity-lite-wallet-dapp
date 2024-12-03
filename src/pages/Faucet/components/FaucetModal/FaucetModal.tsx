import { useRef, useState } from 'react';

import { useRequestFundsMutation } from 'redux/endpoints';
import { FaucetError } from '../FaucetError';
import { FaucetScreen } from '../FaucetScreen';
import { FaucetSuccess } from '../FaucetSuccess';
import { useGetAccount } from 'lib';

export const FaucetModal = () => {
  const ref = useRef(null);
  const [getFunds, { isSuccess }] = useRequestFundsMutation();
  const [fundsReceived, setFundsReceived] = useState(false);
  const [requestFailed, setRequestFailed] = useState('');
  const { address } = useGetAccount();

  const handleRequestClick = async () => {
    const response = await getFunds(address);

    if ('error' in response) {
      setRequestFailed(
        (response.error as any).data.message ||
          'Faucet not available. Try again later.'
      );
    }

    if (ref.current !== null) {
      setFundsReceived(true);
    }
  };

  if (requestFailed) {
    return <FaucetError message={requestFailed} />;
  }

  const showFaucetScreen = !fundsReceived && !isSuccess;

  return (
    <div ref={ref} className='flex flex-col flex-grow'>
      {showFaucetScreen ? (
        <FaucetScreen onRequestClick={handleRequestClick} />
      ) : (
        <FaucetSuccess />
      )}
    </div>
  );
};
