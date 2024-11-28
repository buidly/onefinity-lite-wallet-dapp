import { NetworkType } from '../redux/slices';
import { EnvironmentsEnum } from '../types';

export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: false,
    id: EnvironmentsEnum.devnet,
    name: 'Devnet',
    apiAddress: 'https://devnet-api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://devnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://devnet-api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://devnet-wallet.multiversx.com',
    WEGLDid: ''
  },
  {
    default: false,
    id: EnvironmentsEnum.mainnet,
    name: 'Mainnet',
    apiAddress: 'https://api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://wallet.multiversx.com',
    WEGLDid: ''
  },
  {
    default: true,
    id: 'sovereign',
    name: 'Sovereign',
    apiAddress: 'https://testnet-api.onefinity.network',
    gatewayUrl: 'https://testnet-gateway.onefinity.network',
    extrasApi: 'https://extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://testnet-api.onefinity.network'],
    sovereignContractAddress: '',
    walletAddress: 'https://testnet-litewallet.onefinity.network',
    WEGLDid: ''
  },
  {
    default: false,
    id: EnvironmentsEnum.testnet,
    name: 'Testnet',
    apiAddress: 'https://testnet-api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://testnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://testnet-api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://testnet-wallet.multiversx.com',
    WEGLDid: ''
  }
];
