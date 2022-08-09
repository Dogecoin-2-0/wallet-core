import axios from 'axios';
import { Interface } from '@ethersproject/abi';
import { assetProvidersMap } from '../constants/maps';

export function _jsonRpcRequest(network, method, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(assetProvidersMap[network], { method, params, jsonrpc: '2.0', id: Math.floor(Math.random() * 4) })
      .then(res => res.data)
      .then(({ result, error }) => {
        if (result) resolve(result);
        else if (error) reject(error);
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
