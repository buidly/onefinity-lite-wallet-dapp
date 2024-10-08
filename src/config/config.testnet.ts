import { EnvironmentsEnum } from 'types';
import { NetworkType } from '../redux/slices';

export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: false,
    id: EnvironmentsEnum.devnet,
    name: 'Devnet',
    apiAddress: 'https://devnet-api.multiversx.com',
    gatewayUrl: '',
    sampleAuthenticatedDomains: ['https://devnet-api.multiversx.com'],
    sovereignContractAddress: '',
    WEGLDid: ''
  },
  {
    default: true,
    id: EnvironmentsEnum.devnet,
    name: 'Gateway',
    apiAddress: '',
    gatewayUrl: 'https://devnet-gateway.multiversx.com',
    sampleAuthenticatedDomains: [''],
    sovereignContractAddress: '',
    WEGLDid: ''
  },
  {
    default: false,
    id: EnvironmentsEnum.mainnet,
    name: 'Mainnet',
    apiAddress: 'https://api.multiversx.com',
    gatewayUrl: '',
    sampleAuthenticatedDomains: ['https://api.multiversx.com'],
    sovereignContractAddress: '',
    WEGLDid: ''
  },
  {
    default: false,
    id: 'sovereign',
    name: 'Sovereign',
    apiAddress: 'https://api-sovereign-test.elrond.ro',
    gatewayUrl: '',
    sampleAuthenticatedDomains: ['https://api-sovereign-test.elrond.ro'],
    sovereignContractAddress:
      'erd1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa',
    WEGLDid: 'WEGLD-bd4d79'
  },
  {
    default: true,
    id: EnvironmentsEnum.testnet,
    name: 'onefinity-testnet',
    apiAddress: 'https://testnet-api.onefinity.network',
    gatewayUrl: '',
    sampleAuthenticatedDomains: ['https://testnet-api.onefinity.network'],
    sovereignContractAddress: '',
    WEGLDid: ''
  }
];
