import { utils } from 'ethers';
import { Wallet } from '@ethersproject/wallet';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import * as constants from '../constants';

bcrypt.setRandomFallback(len => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

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

  return Wallet.fromMnemonic(mnemonic);
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

export const fetchTransactions = async address => {
  const txResponse = await fetch(`${constants.PROCESS_ROOT}/transactions?address=${address}`, { method: 'GET' });
  const txResponseJson = await txResponse.json();
  if (txResponse.status >= 400) throw new Error(txResponseJson.error || `Server responded with ${txResponse.status}`);

  return { ...txResponseJson.result };
};

export const numberToHex = num => `0x${num.toString(16)}`;

export const hexToNumber = hex => parseInt(hex, 16);

export const hashPassword = pw => bcrypt.hashSync(pw, bcrypt.genSaltSync(5));

export const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);
