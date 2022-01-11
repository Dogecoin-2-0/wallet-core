import { utils } from 'ethers';
import * as constants from '../constants';

export const generateFromMnemonic = argMnemonic => {
  let mnemonic;

  if (
    (argMnemonic || argMnemonic !== null || typeof argMnemonic !== 'undefined') &&
    typeof argMnemonic === 'string' &&
    argMnemonic.split(' ').length === 12
  )
    mnemonic = argMnemonic;
  else mnemonic = utils.entropyToMnemonic(utils.randomBytes(16));

  return mnemonic;
};

export const fetchBlockchainInfo = async network => {
  const infoResponse = await fetch(`${constants.ASSETS_ROOT}/assets/${network}/info`, { method: 'GET' });
  const infoResponseJson = await infoResponse.json();
  if (infoResponse.status >= 400)
    throw new Error(infoResponseJson.error || `Server responded with ${infoResponse.status}`);
  return { ...infoResponseJson.result, image: `${constants.ASSETS_ROOT}/assets/${network}/image` };
};
