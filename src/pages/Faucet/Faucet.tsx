import { Button, ModalContainer, PrivateKeyCheckWrapper } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { useModal } from '../../hooks';
import { FaucetModal } from './components/FaucetModal';

export const Faucet = () => {
  const { show, handleShow, handleClose } = useModal();

  return (
    <>
      <Button
        className='inline-block rounded-lg px-4 py-2 text-sm text-white'
        data-testid={DataTestIdsEnum.faucetBtn}
        onClick={handleShow}
      >
        Request funds
      </Button>
      <PrivateKeyCheckWrapper>
        <ModalContainer
          className='login-modal p-6'
          onClose={handleClose}
          visible={show}
        >
          <FaucetModal />
        </ModalContainer>
      </PrivateKeyCheckWrapper>
    </>
  );
};
