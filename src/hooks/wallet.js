import { useState, useCallback, useEffect } from 'react';
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
