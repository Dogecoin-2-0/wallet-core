import { useState, useCallback, useEffect } from 'react';
import Singleton from '../https/singleton';
import { callGasOracle, generateFromMnemonic } from '../utils';

export const useWalletFromMnemonic = () => {
  const [_wallet, setWallet] = useState(null);
  const [dep] = useState(true);

  useEffect(() => {
    setWallet(null);
  }, []);

  const mnemonicWallet = useCallback(
    mnemonic => {
      setWallet(generateFromMnemonic(mnemonic));
    },
    [dep]
  );
  return { _wallet, mnemonicWallet };
};

export const useBalance = () => {
  const [balance, setBalance] = useState('0');
  const [dep] = useState(true);

  const getBalance = useCallback(
    (network, id, address) => {
      if (network === 'self') {
        Singleton.getInstance()
          .getNativeBalance(id, address)
          .then(bal => setBalance(bal));
      } else {
        Singleton.getInstance()
          .getTokenBalance(network, id, address)
          .then(bal => setBalance(bal));
      }
    },
    [dep]
  );
  return { balance, getBalance };
};

export const useTransaction = () => {
  const [tx, setTx] = useState(null);
  const [deps] = useState(true);

  const createTransaction = useCallback(
    (network, from, to, value, gasLimit, gasPrice, pk) => {
      Singleton.getInstance()
        .createNativeTransaction(network, from, to, value, gasPrice, gasLimit, pk)
        .then(transaction => setTx(transaction));
    },
    [deps]
  );

  const createERC20LikeTransaction = useCallback(
    (network, from, token, to, value, gasPrice, gasLimit, pk) => {
      Singleton.getInstance()
        .createTokenTransaction(network, token, from, to, value, gasPrice, gasLimit, pk)
        .then(transaction => setTx(transaction));
    },
    [deps]
  );

  return { transaction: tx, createTransaction, createERC20LikeTransaction };
};

export const useGasOracle = () => {
  const [result, setResult] = useState(null);
  const [deps] = useState(true);

  const getProposedFees = useCallback(
    network => {
      callGasOracle(network).then(response => {
        setResult(response);
      });
    },
    [deps]
  );

  return { result, getProposedFees };
};
