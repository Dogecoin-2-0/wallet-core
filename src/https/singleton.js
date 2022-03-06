/* eslint-disable no-undef */
import { Transaction } from '@ethereumjs/tx';
import Common, { Hardfork } from '@ethereumjs/common';
import JSBI from 'jsbi';
import { hexToNumber, numberToHex } from '../utils';
import { _encodeFunctionData, _getSigHash, _jsonRpcRequest } from './rpc';
import abi from '../assets/ERC20ABI.json';
import { chainIdMap } from '../constants/maps';

export default class Singleton {
  static getInstance() {
    return new Singleton();
  }

  async getNativeBalance(network, address) {
    const bal = await _jsonRpcRequest(network, 'eth_getBalance', [address, 'latest']);
    const balance = hexToNumber(bal) / 10 ** 18;
    return Promise.resolve(parseFloat(balance).toPrecision(2));
  }

  async getTokenBalance(network, token, address) {
    const decimalFunctionEncoded = _getSigHash(abi, 'decimals');
    const res = await _jsonRpcRequest(network, 'eth_call', [{ to: token, data: decimalFunctionEncoded }, 'latest']);
    const decimals = hexToNumber(res === '0x' ? '0x12' : res);
    const balanceOfEncoded = _encodeFunctionData(abi, 'balanceOf', [address]);
    const bal = await _jsonRpcRequest(network, 'eth_call', [{ to: token, data: balanceOfEncoded }, 'latest']);
    const balance = hexToNumber(bal === '0x' ? '0x0' : bal) / 10 ** decimals;
    return Promise.resolve(parseFloat(balance).toPrecision(2));
  }

  async createNativeTransaction(network, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    return Transaction.fromTxData(
      {
        to,
        nonce,
        value: numberToHex(value * 10 ** 18),
        gasLimit: numberToHex(gasLimit),
        gasPrice: numberToHex(gasPrice * 10 ** 9)
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createTokenTransaction(network, token, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const decimalFunctionEncoded = _getSigHash(abi, 'decimals');
    const res = await _jsonRpcRequest(network, 'eth_call', [{ to: token, data: decimalFunctionEncoded }, 'latest']);
    const decimals = JSBI.toNumber(JSBI.BigInt(res));
    const funcEncoded = _encodeFunctionData(abi, 'transfer', [to, value * 10 ** decimals]);
    return Transaction.fromTxData(
      {
        nonce,
        to: token,
        value: '0x0',
        gasLimit: numberToHex(gasLimit),
        gasPrice: numberToHex(gasPrice * 10 ** 9),
        data: funcEncoded
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async broadcastTx(transaction, network) {
    const signedTxHex = `0x${transaction.serialize().toString('hex')}`;
    return Promise.resolve(_jsonRpcRequest(network, 'eth_sendRawTransaction', [signedTxHex]));
  }

  async getTxNonce(network, txHash) {
    let { nonce } = await _jsonRpcRequest(network, 'eth_getTransactionByHash', [txHash]);
    nonce = hexToNumber(nonce);
    return Promise.resolve(nonce);
  }
}
