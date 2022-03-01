import { useState, useEffect, useCallback } from 'react';
import { _getAccountById, _getActiveId, _getAllAccounts } from '../storage';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    _getAllAccounts().then(accs => setAccounts(accs));
  }, []);
  return accounts;
};

export const useAccountById = () => {
  const [account, setAccount] = useState(null);

  const accountById = useCallback(id => {
    _getAccountById(id).then(acc => setAccount(acc));
  }, []);
  return [account, accountById];
};

export const useActiveAccount = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    _getActiveId().then(id => {
      _getAccountById(id).then(acc => setAccount(acc));
    });
  }, []);

  return account;
};
