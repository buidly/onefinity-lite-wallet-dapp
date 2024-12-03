export const addressIsBech32 = (address = '') => {
  const isValidBech32 = !(
    !address ||
    !address.startsWith('one') ||
    address.length !== 62 ||
    /^\w+$/.test(address) !== true
  );
  return isValidBech32;
};

const isValidEvmAddress = (addr: string) => {
  const strippedAddress = addr.startsWith('0x') ? addr.slice(2) : addr;
  return /^[0-9a-fA-F]{40}$/.test(strippedAddress);
};

export const addressIsBech32OrEvm = (address = '') => {
  return addressIsBech32(address) || isValidEvmAddress(address);
};
