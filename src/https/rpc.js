import { Interface } from '@ethersproject/abi';
import { assetProvidersMap } from '../constants/maps';

export function _jsonRpcRequest(network, method, params) {
  return new Promise((resolve, reject) => {
    fetch(assetProvidersMap[network], {
      method: 'POST',
      body: JSON.stringify({ method, jsonrpc: '2.0', id: 1, params }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status >= 400) reject(new Error(`RPC responded with ${res.status}`));
        return res.json();
      })
      .then(res => {
        if (!('result' in res) || 'error' in res) reject(new Error(res.error.message));

        resolve(res.result);
      })
      .catch(reject);
  });
}

export function _getSigHash(abi, methodName) {
  const abiInterface = new Interface(abi);
  return abiInterface.getSighash(methodName);
}

export function _encodeFunctionData(abi, name, data) {
  const abiInterface = new Interface(abi);
  return abiInterface.encodeFunctionData(name, data);
}

export function _decodeFunctionResult(abi, name, data) {
  const abiInterface = new Interface(abi);
  return abiInterface.decodeFunctionResult(name, data);
}
