import { Button } from 'components';
import { getEgldLabel } from 'lib';
import { DataTestIdsEnum } from 'localConstants';

export interface FaucetScreenPropsType {
  onRequestClick: () => void;
}

export const FaucetScreen = ({ onRequestClick }: FaucetScreenPropsType) => {
  const egldLabel = getEgldLabel();

  const handleRequestTokens = () => {
    onRequestClick();
  };

  return (
    <div className='flex flex-col items-center pb-5'>
      <h1
        className='text-2xl whitespace-nowrap mt-5'
        data-testid={DataTestIdsEnum.modalTitle}
      >
        {egldLabel} Faucet
      </h1>
      <p
        className='text-sm text-gray-400 mb-10'
        data-testid={DataTestIdsEnum.modalSubtitle}
      >
        You can request tokens every 5 minutes if your balance is less than 1
        ONE
      </p>

      <Button
        data-testid={DataTestIdsEnum.requestFundsButton}
        id={DataTestIdsEnum.requestFundsButton}
        onClick={handleRequestTokens}
      >
        Request Tokens
      </Button>
    </div>
  );
};
