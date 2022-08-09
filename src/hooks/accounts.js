import { useState, useEffect, useCallback } from 'react';
import { _getAccountById, _getActiveId, _getAllAccounts, _getRecentTx } from '../storage';
import { fetchTransactions } from '../utils';

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
  return { account, accountById };
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

export const useAccountTxs = () => {
  const [txns, setTxns] = useState([]);
  useEffect(() => {
    try {
      _getActiveId().then(id => {
        _getAccountById(id).then(acc => {
          fetchTransactions(acc.walletId)
            .then(transactions => setTxns(transactions))
            .catch(err => {
              console.log(err.message);
            });
        });
      });
    } catch (error) {
      console.log(error.message);
    }
    return () => {
      setTxns([]);
    };
  }, []);

  return txns;
};

export const useRecentTxs = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    _getRecentTx().then(val => {
      setResult(val);
    });
  }, []);

  return result;
};
