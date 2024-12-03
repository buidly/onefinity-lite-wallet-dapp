import { faucetEndpoint } from 'config';
import { getBaseURL } from 'helpers';
import { RootApi } from 'redux/rootApi';
export interface FaucetSettingsReturnType {
  recaptchaBypass?: boolean;
  token: string;
}

const faucetEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    requestFunds: builder.mutation<void, string>({
      query: (address: string) => ({
        baseURL: getBaseURL(),
        url: faucetEndpoint,
        method: 'POST',
        data: { address },
        validateStatus: (status) => status >= 200 && status < 300
      })
    })
  })
});

export const { useRequestFundsMutation } = faucetEndpoints;
