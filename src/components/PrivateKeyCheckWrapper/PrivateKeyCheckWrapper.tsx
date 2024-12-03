import { PropsWithChildren, useState } from 'react';
import { useSelector } from 'react-redux';
import { provider } from 'helpers/app';
import { KeystoreModal } from 'pages/Unlock/components/Keystore/components/KeystoreModal';
import { PemModal } from 'pages/Unlock/components/Pem/components/PemModal';
import { accountSelector, hookSelector } from 'redux/selectors';
import { FileLoginEnum } from 'redux/slices';
import { useGlobalContext } from 'context/useGlobalContext';

export const PrivateKeyCheckWrapper = ({ children }: PropsWithChildren) => {
  const { type: hook } = useSelector(hookSelector);
  const { fileLogin } = useSelector(accountSelector);
  const { evmAccount } = useGlobalContext();

  const [show, setShow] = useState(
    !provider.isInitialized() && Boolean(fileLogin) && !evmAccount
  );

  const handleModalClose = () => {
    setShow(!provider.isInitialized() && Boolean(fileLogin) && !evmAccount);
  };

  const hideChildren = show && hook;

  return (
    <>
      {fileLogin === FileLoginEnum.keystore && (
        <KeystoreModal handleClose={handleModalClose} show={show} />
      )}
      {fileLogin === FileLoginEnum.pem && (
        <PemModal handleClose={handleModalClose} show={show} />
      )}
      {hideChildren ? null : children}
    </>
  );
};
