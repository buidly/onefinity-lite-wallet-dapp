
import { ethers } from 'ethers';

const testnetOnefinity = {
  chainId: '0xf4233', // 999987 in hexadecimal
  chainName: 'Testnet Onefinity',
  rpcUrls: ['https://testnet-rpc.onefinity.network'],
  blockExplorerUrls: ['https://testnet-explorer.onefinity.network'],
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18
  }
};

export default function useGetMetamaskAccount(
  onConnect: (account: string) => void,
  onDisconnect: () => void
) {
  const switchToTestnetOnefinity = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    try {
      await provider.send('wallet_switchEthereumChain', [
        { chainId: testnetOnefinity.chainId }
      ]);
    } catch (switchError: any) {
      if (switchError.error.code === 4902) {
        try {
          await provider.send('wallet_addEthereumChain', [testnetOnefinity]);
        } catch (addError) {
          console.error(
            'Error adding the Testnet Onefinity network:',
            addError
          );
        }
      } else {
        console.error(
          'Error switching to the Testnet Onefinity network:',
          switchError
        );
      }
    }
  };

  const getAccount = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      await switchToTestnetOnefinity();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      onConnect(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    onDisconnect();
  };

  return { getAccount, disconnect };
}
