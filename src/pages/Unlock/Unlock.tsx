import { MxLink } from 'components';
import { DataTestIdsEnum, HooksEnum } from 'localConstants';
import { AuthRedirectWrapper } from 'wrappers';
import { CreateRecoverRoutesEnum } from '../CreateRecover/routes';
import { Keystore, Pem } from './components';
import { crossEcosystemDashboard } from 'config';
import { nativeAuth } from 'config';
import { useSelector } from 'react-redux';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import {
  LedgerLoginButtonPropsType,
  OperaWalletLoginButtonPropsType,
  WalletConnectLoginButtonPropsType
} from 'types';
import { useUnlockRedirect } from './hooks';

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const onUnlockRedirect = useUnlockRedirect();

  // @ts-ignore
  const commonProps: CommonPropsType = {
    callbackRoute: routeNames.dashboard,
    nativeAuth,
    onLoginRedirect: () => onUnlockRedirect()
  };

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
          {hook !== HooksEnum.login && (
            <div className='flex flex-col items-center justify-center mt-1 gap-1'>
              <div className='flex flex-col md:flex-row md:gap-4 items-center justify-center'>
                <a
                  href={`${crossEcosystemDashboard}`}
                  target='_blank'
                  className='text-black underline decoration-dotted hover:decoration-solid'
                >
                  Go to cross ecosystem dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
