import { Transaction } from '@ethereumjs/tx';
import JSBI from 'jsbi';
import { hexToNumber, numberToHex } from '../utils';
import { _encodeFunctionData, _getSigHash, _jsonRpcRequest } from './rpc';
import abi from '../assets/ERC20ABI.json';

export default class Singleton {
  static getInstance() {
    return new Singleton();
  }

  async getNativeBalance(network, address) {
    const bal = await _jsonRpcRequest(network, 'eth_getBalance', [address, 'latest']);
    const balance = hexToNumber(bal) / 10 ** 18;
    return Promise.resolve(parseFloat(balance).toPrecision(4));
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

  async sendNativeTransaction(network, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const tx = Transaction.fromTxData({
      to,
      nonce,
      value: numberToHex(value * 10 ** 18),
      gasLimit: numberToHex(gasLimit),
      gasPrice: numberToHex(gasPrice * 10 ** 9)
    });

    const privateKey = Buffer.from(pk, 'hex');
    tx.sign(privateKey);

    const txSignedHex = `0x${tx.serialize().toString('hex')}`;
    const txHash = await _jsonRpcRequest(network, 'eth_sendRawTransaction', [txSignedHex]);
    return Promise.resolve(txHash);
  }

  async sendTokenTransaction(network, token, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const decimalFunctionEncoded = _getSigHash(abi, 'decimals');
    const res = await _jsonRpcRequest(network, 'eth_call', [{ to: token, data: decimalFunctionEncoded }, 'latest']);
    const decimals = JSBI.toNumber(JSBI.BigInt(res));
    const funcEncoded = _encodeFunctionData(abi, 'transfer', [to, value * 10 ** decimals]);
    const tx = Transaction.fromTxData({
      nonce,
      to: token,
      value: '0x0',
      gasLimit: numberToHex(gasLimit),
      gasPrice: numberToHex(gasPrice * 10 ** 9),
      data: funcEncoded
    });
    const privateKey = Buffer.from(pk, 'hex');
    tx.sign(privateKey);

    const txSignedHex = `0x${tx.serialize().toString('hex')}`;
    const txHash = await _jsonRpcRequest(network, 'eth_sendRawTransaction', [txSignedHex]);

    return Promise.resolve(txHash);
  }
}
