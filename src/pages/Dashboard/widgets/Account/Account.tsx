import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { Copy, Label, MxLink } from 'components';
import { FormatAmount } from 'components/sdkDapp.components';
import { useGetNetworkConfig } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { Faucet } from 'pages/Faucet';
import {
  explorerAddressSelector,
  useSdkDappSelector
} from 'redux/sdkDapp.store';
import { networkSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { useGlobalContext } from 'context/useGlobalContext';

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { activeNetwork } = useSelector(networkSelector);
  const explorerAddress = useSdkDappSelector(explorerAddressSelector);
  const isSovereign = activeNetwork.id === 'sovereign';
  const { mvxAddressFromApi, evmAddressFromApi, balance } = useGlobalContext();

  return (
    <div className='rounded-xl bg-gray-950 p-6 text-white sm:text-left'>
      <div className='flex flex-col gap-6 sm:flex-row'>
        <div className='flex grow flex-col gap-4 overflow-hidden'>
          <div className='overflow-hidden text-ellipsis text-xl font-medium xs:text-2xl'>
            Account
          </div>
          <div>
            {mvxAddressFromApi && (
              <div
                className='overflow-hidden break-all text-sm'
                data-testid={DataTestIdsEnum.userAddress}
              >
                <Label>ONE: </Label>
                {mvxAddressFromApi}
                <Copy value={mvxAddressFromApi} />
              </div>
            )}
            {evmAddressFromApi && (
              <div
                className='overflow-hidden break-all text-sm'
                data-testid={DataTestIdsEnum.userAddress}
              >
                <Label>EVM: </Label>
                {evmAddressFromApi}
                <Copy value={evmAddressFromApi} />
              </div>
            )}
          </div>
          <div className='my-1 flex justify-center sm:hidden'>
            <QRCode
              className='rounded-lg border-8 border-white bg-white'
              value={mvxAddressFromApi ?? evmAddressFromApi ?? ''}
              size={200}
              fgColor='#030712'
            />
          </div>
          <div>
            <div className='text-sm text-gray-400'>Your balance:</div>
            <div className='flex items-center justify-center sm:justify-start'>
              <div className='flex items-center justify-start gap-2 '>
                <span className='text-xl'>
                  <FormatAmount
                    value={balance}
                    egldLabel={network.egldLabel}
                    data-testid='balance'
                  />
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-4'>
            <a
              href={`${explorerAddress}/accounts/${
                mvxAddressFromApi ?? evmAddressFromApi ?? ''
              }`}
              target='_blank'
              className='inline-block rounded-lg gradient-button px-4 py-2 text-sm text-white'
            >
              Open in Explorer
            </a>
            {isSovereign && <Faucet />}
            <MxLink
              className='inline-block rounded-lg gradient-button px-4 py-2 text-sm text-white'
              data-testid={DataTestIdsEnum.sendBtn}
              to={routeNames.send}
            >
              Send
            </MxLink>
            <MxLink
              className='inline-block rounded-lg gradient-button px-4 py-2 text-sm text-white'
              data-testid={DataTestIdsEnum.signMessageBtn}
              to={routeNames.signMessage}
            >
              Sign Message
            </MxLink>
            <MxLink
              className='inline-block rounded-lg gradient-button px-4 py-2 text-sm text-white'
              data-testid={DataTestIdsEnum.sovereignTransferBtn}
              to={routeNames.sovereignTransfer}
            >
              Sovereign Transfer
            </MxLink>
            {/* {isSovereign && (
              <MxLink
                className='inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white'
                data-testid={DataTestIdsEnum.registerTokenBtn}
                to={routeNames.registerToken}
              >
                Register Token
              </MxLink>
            )} */}
          </div>
        </div>
        <div className='mb-2 hidden justify-center sm:block'>
          <QRCode
            className='rounded-lg border-8 border-white bg-white'
            value={mvxAddressFromApi ?? evmAddressFromApi ?? ''}
            size={120}
            fgColor='#030712'
          />
        </div>
      </div>
    </div>
  );
};
