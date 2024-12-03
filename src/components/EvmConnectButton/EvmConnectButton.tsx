import { Button } from 'components/Button';
import { useGlobalContext } from 'context/useGlobalContext';

export const EvmConnectButton = () => {
  const { evmConnect } = useGlobalContext();

  return (
    <>
      <Button
        className='dapp-core-component__main__btn dapp-core-component__main__btn-primary dapp-core-component__main__px-4 dapp-core-component__main__m-1 dapp-core-component__main__mx-3 dapp-default-login-button bg-slate-500'
        onClick={evmConnect}
      >
        Metamask
      </Button>
    </>
  );
};
