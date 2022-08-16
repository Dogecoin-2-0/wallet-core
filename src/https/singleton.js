/* eslint-disable no-undef */
import { Transaction } from '@ethereumjs/tx';
import Common, { Hardfork } from '@ethereumjs/common';
import { formatEther, formatUnits, parseEther, parseUnits } from '@ethersproject/units';
import { hexToNumber, numberToHex } from '../utils';
import { _encodeFunctionData, _getSigHash, _jsonRpcRequest } from './rpc';
import erc20Abi from '../assets/ERC20ABI.json';
import transactionProxyAbi from '../assets/TransactionProxyABI.json';
import timelockedAbi from '../assets/TimelockABI.json';
import { chainIdMap, timelockedSmartContractsMap, transactionProxyContractsMap } from '../constants/maps';

export default class Singleton {
  static getInstance() {
    return new Singleton();
  }

  getNativeBalance(network, address) {
    return new Promise((resolve, reject) => {
      _jsonRpcRequest(network, 'eth_getBalance', [address, 'latest'])
        .then(val => resolve(parseFloat(formatEther(val)).toFixed(3)))
        .catch(reject);
    });
  }

  async getTokenBalance(network, token, address) {
    try {
      const decimalFunctionEncoded = _getSigHash(erc20Abi, 'decimals');
      const decimalsRes = await _jsonRpcRequest(network, 'eth_call', [
        { to: token, data: decimalFunctionEncoded },
        'latest'
      ]);
      const balanceOfEncoded = _encodeFunctionData(erc20Abi, 'balanceOf', [address]);
      const bal = await _jsonRpcRequest(network, 'eth_call', [{ to: token, data: balanceOfEncoded }, 'latest']);
      return parseFloat(formatUnits(bal, decimalsRes)).toFixed(3);
    } catch (error) {
      console.log(error);
    }
  }

  async createSimpleTransaction(network, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);

    value = parseEther(value.toString()).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    return Transaction.fromTxData(
      {
        to,
        nonce,
        value,
        gasLimit,
        gasPrice
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createSimpleTokenTransaction(network, token, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const decimalFunctionEncoded = _getSigHash(erc20Abi, 'decimals');
    const decimalsRes = await _jsonRpcRequest(network, 'eth_call', [
      { to: token, data: decimalFunctionEncoded },
      'latest'
    ]);

    value = parseUnits(value.toString(), decimalsRes).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    const data = _encodeFunctionData(erc20Abi, 'transfer', [to, value]);
    return Transaction.fromTxData(
      {
        nonce,
        to: token,
        value: '0x0',
        gasLimit,
        gasPrice,
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createNativeTransaction(network, from, to, value, gasPrice, gasLimit, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);

    value = parseEther(value.toString()).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    console.log(value, gasLimit);

    const data = _encodeFunctionData(transactionProxyAbi, 'proxyTransferEther', [to]);

    return Transaction.fromTxData(
      {
        to: transactionProxyContractsMap[network],
        nonce,
        value,
        gasLimit,
        gasPrice,
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createLockedNativeTransaction(network, from, to, value, lockTime, gasLimit, gasPrice, pk) {
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);

    value = parseEther(value.toString()).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    console.log(value, gasLimit);

    const data = _encodeFunctionData(timelockedAbi, '_lockEtherForLater', [numberToHex(lockTime), to]);

    return Transaction.fromTxData(
      {
        to: timelockedSmartContractsMap[network],
        nonce,
        value,
        gasLimit,
        gasPrice,
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createTokenTransaction(network, token, from, to, value, gasPrice, gasLimit, pk) {
    const nonce1 = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const decimalFunctionEncoded = _getSigHash(erc20Abi, 'decimals');
    const decimalsRes = await _jsonRpcRequest(network, 'eth_call', [
      { to: token, data: decimalFunctionEncoded },
      'latest'
    ]);

    value = parseUnits(value.toString(), decimalsRes).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    // Approval
    const d = _encodeFunctionData(erc20Abi, 'approve', [transactionProxyContractsMap[network], value]);
    const approvalT = Transaction.fromTxData(
      {
        nonce: nonce1,
        to: token,
        data: d
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));

    await this.broadcastTx(approvalT, network);

    // Proxy transaction
    const nonce2 = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const data = _encodeFunctionData(transactionProxyAbi, 'proxyTransferERC20', [token, to, value]);
    return Transaction.fromTxData(
      {
        nonce: nonce2,
        to: transactionProxyContractsMap[network],
        value: '0x0',
        gasLimit,
        gasPrice,
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async createLockedTokenTransaction(network, token, from, to, value, lockTime, gasLimit, gasPrice, pk) {
    const nonce1 = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const decimalFunctionEncoded = _getSigHash(erc20Abi, 'decimals');
    const decimalsRes = await _jsonRpcRequest(network, 'eth_call', [
      { to: token, data: decimalFunctionEncoded },
      'latest'
    ]);

    value = parseUnits(value.toString(), decimalsRes).toHexString();
    gasLimit = numberToHex(gasLimit);
    gasPrice = parseUnits(gasPrice.toString(), 'gwei').toHexString();

    // Approval
    const d = _encodeFunctionData(erc20Abi, 'approve', [timelockContractsMap[network], value]);
    const approvalT = Transaction.fromTxData(
      {
        nonce: nonce1,
        to: token,
        data: d
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));

    await this.broadcastTx(approvalT, network);

    // Calculate fee
    const encodedFeeCalcFunc = _encodeFunctionData(timelockedAbi, '_calculateFee', [numberToHex(lockTime), value]);
    const fee = await _jsonRpcRequest(network, 'eth_call', [
      { to: timelockedSmartContractsMap[network], data: encodedFeeCalcFunc },
      'latest'
    ]);

    // Locked transaction
    const nonce2 = await _jsonRpcRequest(network, 'eth_getTransactionCount', [from, 'latest']);
    const data = _encodeFunctionData(timelockedAbi, '_lockTokenForLater', [token, numberToHex(lockTime), to, value]);
    return Transaction.fromTxData(
      {
        nonce: nonce2,
        to: timelockedSmartContractsMap[network],
        value: fee,
        gasLimit,
        gasPrice,
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
  }

  async processLockedTx(tx, pk, gasPrice = '71') {
    const network = Object.keys(chainIdMap).find(key => chainIdMap[key] === hexToNumber(tx.chainId));
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [tx.from, 'latest']);
    const data = _encodeFunctionData(timelockedAbi, '_proceedWithTx', [tx.id]);
    const gasLimit = await _jsonRpcRequest(network, 'eth_estimateGas', [
      {
        from: tx.from,
        to: timelockedSmartContractsMap[network],
        value: '0x0',
        data,
        nonce
      },
      'latest'
    ]);

    const transaction = Transaction.fromTxData(
      {
        to: timelockedSmartContractsMap[network],
        nonce,
        value: '0x0',
        gasLimit,
        gasPrice: parseUnits(gasPrice, 'gwei').toHexString(),
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
    return Promise.resolve(this.broadcastTx(transaction, network));
  }

  async cancelLockedTx(tx, pk, gasPrice = '71') {
    const network = Object.keys(chainIdMap).find(key => chainIdMap[key] === hexToNumber(tx.chainId));
    const nonce = await _jsonRpcRequest(network, 'eth_getTransactionCount', [tx.from, 'latest']);
    const data = _encodeFunctionData(timelockedAbi, '_cancelTx', [tx.id]);
    const gasLimit = await _jsonRpcRequest(network, 'eth_estimateGas', [
      {
        from: tx.from,
        to: timelockedSmartContractsMap[network],
        value: '0x0',
        data,
        nonce
      },
      'latest'
    ]);

    const transaction = Transaction.fromTxData(
      {
        to: timelockedSmartContractsMap[network],
        nonce,
        value: '0x0',
        gasLimit,
        gasPrice: parseUnits(gasPrice, 'gwei').toHexString(),
        data
      },
      { common: Common.custom({ chainId: chainIdMap[network], defaultHardfork: Hardfork.Istanbul }) }
    ).sign(Buffer.from(pk.replace('0x', ''), 'hex'));
    return Promise.resolve(this.broadcastTx(transaction, network));
  }

  broadcastTx(transaction, network) {
    const signedTxHex = `0x${transaction.serialize().toString('hex')}`;
    return new Promise((resolve, reject) => {
      _jsonRpcRequest(network, 'eth_sendRawTransaction', [signedTxHex])
        .then(val => resolve(val))
        .catch(reject);
    });
  }

  getTxNonce(network, txHash) {
    return new Promise((resolve, reject) => {
      _jsonRpcRequest(network, 'eth_getTransactionByHash', [txHash])
        .then(({ nonce }) => {
          const nonceAsNum = hexToNumber(nonce);
          resolve(nonceAsNum);
        })
        .catch(reject);
    });
  }
}
