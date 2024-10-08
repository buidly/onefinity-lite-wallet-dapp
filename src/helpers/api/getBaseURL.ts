import { networkSelector } from 'redux/selectors';
import { RootState, store } from 'redux/store';

export function getBaseURL() {
  const state: RootState = store.getState();
  const {
    activeNetwork: { apiAddress }
  } = networkSelector(state);

  return apiAddress;
}
