import { useState, useCallback, useEffect } from 'react';
import Singleton from '../https/singleton';
import { generateFromMnemonic } from '../utils';

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
