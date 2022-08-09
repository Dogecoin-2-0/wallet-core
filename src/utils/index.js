import axios from 'axios';
import { entropyToMnemonic } from '@ethersproject/hdnode';
import { randomBytes } from '@ethersproject/random';
import { Wallet } from '@ethersproject/wallet';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';
import * as constants from '../constants';
import { gasOraclesMap } from '../constants/maps';

const assetsClient = axios.create({ baseURL: constants.ASSETS_ROOT });
const processesClient = axios.create({ baseURL: constants.PROCESS_ROOT });

(() => {
  bcrypt.setRandomFallback(len => {
    const buf = new Uint8Array(len);

    return buf.map(() => Math.floor(isaac.random() * 256));
  });
})();

export const generateMnemonic = () => {
  return entropyToMnemonic(randomBytes(16));
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

export const fetchBlockchainInfo = network => {
  return new Promise((resolve, reject) => {
    assetsClient
      .get(`/assets/${network}/info`)
      .then(res => res.data)
      .then(({ result }) => resolve({ ...result, image: `${constants.ASSETS_ROOT}/assets/${network}/image` }))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const fetchTokenInfo = (network, address) => {
  return new Promise((resolve, reject) => {
    assetsClient
      .get(`/assets/tokens/${network}/${address}/info`)
      .then(res => res.data)
      .then(({ result }) =>
        resolve({ ...result, image: `${constants.ASSETS_ROOT}/assets/tokens/${network}/${address}/image`, network })
      )
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const fetchChainList = () => {
  return new Promise((resolve, reject) => {
    assetsClient
      .get('/assets/list')
      .then(res => res.data)
      .then(({ result }) => resolve(result.map(r => ({ id: r, network: 'self' }))))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const fetchTokensList = network => {
  return new Promise((resolve, reject) => {
    assetsClient
      .get(`/assets/tokens/${network}/addresses`)
      .then(res => res.data)
      .then(({ result }) => resolve(result.map(r => ({ id: r, network }))))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const fetchTransactions = id => {
  return new Promise((resolve, reject) => {
    processesClient
      .get(`/transactions/${id}`)
      .then(res => res.data)
      .then(({ result }) => resolve(result))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const callGasOracle = network => {
  return new Promise((resolve, reject) => {
    axios
      .get(gasOraclesMap[network])
      .then(res => res.data)
      .then(({ result }) => resolve(result))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const saveData = address => {
  return new Promise((resolve, reject) => {
    processesClient
      .post('/wallet', { address })
      .then(res => res.data)
      .then(({ result }) => resolve(result))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const fetchPrices = () => {
  return new Promise((resolve, reject) => {
    processesClient
      .get('/prices')
      .then(res => res.data)
      .then(({ result }) => resolve(result))
      .catch(err => reject(new Error(err.response?.data?.error || err.message)));
  });
};

export const numberToHex = num => `0x${num.toString(16)}`;
export const hexToNumber = hex => parseInt(hex, 16);
export const hashPassword = pw => bcrypt.hashSync(pw, bcrypt.genSaltSync(5));
export const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);
