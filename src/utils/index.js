import { utils } from 'ethers';
import * as constants from '../constants';

export const generateMnemonic = () => {
  return utils.entropyToMnemonic(utils.randomBytes(16));
};

export const generateFromMnemonic = argMnemonic => {
  let mnemonic;

  if (
    (argMnemonic || argMnemonic !== null || typeof argMnemonic !== 'undefined') &&
    typeof argMnemonic === 'string' &&
    argMnemonic.split(' ').length === 12
  )
    mnemonic = argMnemonic;
  else mnemonic = generateMnemonic();

  return mnemonic;
};

export const fetchBlockchainInfo = async network => {
  const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/${network}/info`, { method: 'GET' });
  const infoResponseJson = await infoResponse.json();
  if (infoResponse.status >= 400)
    throw new Error(infoResponseJson.error || `Server responded with ${infoResponse.status}`);
  return { ...infoResponseJson.result, image: `${constants.ASSETS_ROOT}/assets/${network}/image` };
};

export const fetchTokenInfo = async (network, address) => {
  const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/tokens/${network}/${address}/info`, {
    method: 'GET'
  });
  const infoResponseJson = await infoResponse.json();
  if (infoResponse.status >= 400)
    throw new Error(infoResponseJson.error || `Server responded with ${infoResponse.status}`);
  return { ...infoResponseJson.result, image: `${constants.ASSETS_ROOT}/assets/tokens/${network}/${address}/image` };
};

export const fetchChainList = async () => {
  const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/list`, { method: 'GET' });
  const infoResponseJson = await infoResponse.json();
  if (infoResponse.status >= 400)
    throw new Error(infoResponseJson.error || `Server responded with ${infoResponse.status}`);
  return [...infoResponseJson.result].map(id => ({ id, network: 'self' }));
};

export const fetchTokensList = async network => {
  const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/tokens/${network}/addresses`, { method: 'GET' });
  const infoResponseJson = await infoResponse.json();
  if (infoResponse.status >= 400)
    throw new Error(infoResponseJson.error || `Server responded with ${infoResponse.status}`);
  return [...infoResponseJson.result].map(id => ({ network, id }));
};
