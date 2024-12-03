import { MxLink } from 'components';
import { EvmConnectButton } from 'components/EvmConnectButton';
import { DataTestIdsEnum, HooksEnum } from 'localConstants';
import { useSelector } from 'react-redux';
import { hookSelector } from 'redux/selectors';
import { AuthRedirectWrapper } from 'wrappers';
import { CreateRecoverRoutesEnum } from '../CreateRecover/routes';
import { Keystore, Pem } from './components';

export const Unlock = () => {
  const { type: hook } = useSelector(hookSelector);

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex justify-center items-center'>
        <div
          className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
          data-testid={DataTestIdsEnum.unlockPage}
        >
          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-2xl'>Login</h2>

            <p className='text-center text-gray-400'>Choose a login method</p>
          </div>

          <div className='flex flex-col md:flex-row'>
            {/* <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
            />
            <LedgerLoginButton loginButtonText='Ledger' {...commonProps} />
            <ExtensionLoginButton
              loginButtonText='DeFi Wallet'
              {...commonProps}
            />
            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />

            <XaliasLoginButton
              loginButtonText='xAlias'
              data-testid='xAliasLoginBtn'
              {...commonProps}
            /> */}

            {hook !== HooksEnum.login && <EvmConnectButton />}

            <Pem />
            <Keystore />
          </div>
          <div className='flex flex-col items-center justify-center mt-1 gap-1'>
            <p className='text-center text-gray-400'>Don't have a wallet?</p>
            <div className='flex flex-col md:flex-row md:gap-4 items-center justify-center'>
              <MxLink
                className='text-black underline decoration-dotted hover:decoration-solid'
                data-testid={DataTestIdsEnum.createWalletBtn}
                to={CreateRecoverRoutesEnum.create}
              >
                Create
              </MxLink>
              <MxLink
                className='text-black underline decoration-dotted hover:decoration-solid'
                data-testid={DataTestIdsEnum.recoverWalletBtn}
                to={CreateRecoverRoutesEnum.recover}
              >
                Recover
              </MxLink>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
