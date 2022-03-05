import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

export const _saveAccount = (pw, name, address, seedPhrase, pk) => {
  const id = uuid();
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('accounts').then(accounts => {
      if (!accounts || accounts === null || typeof accounts === 'undefined')
        AsyncStorage.setItem('accounts', JSON.stringify([{ id, pw, name, address, seedPhrase, pk }]))
          .then(() => resolve(id))
          .catch(reject);
      else
        AsyncStorage.setItem(
          'accounts',
          JSON.stringify([...JSON.parse(accounts), { id, pw, name, address, seedPhrase, pk }])
        )
          .then(() => resolve(id))
          .catch(reject);
    });
  });
};

export const _getAccountById = id => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('accounts')
      .then(accounts => {
        if (!accounts || accounts === null || typeof accounts === 'undefined')
          reject(new Error('No account exists on this device'));
        else {
          const account = [...JSON.parse(accounts)].find(acc => acc.id === id);
          if (!account) resolve(null);
          resolve(account);
        }
      })
      .catch(reject);
  });
};

export const _getAllAccounts = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('accounts')
      .then(accounts => {
        if (!accounts || accounts === null || typeof accounts === 'undefined')
          reject(new Error('No account exists on this device'));
        resolve([...JSON.parse(accounts)]);
      })
      .catch(reject);
  });
};

export const _setActiveId = id => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('activeId', id)
      .then(() => resolve())
      .catch(reject);
  });
};

export const _resetActiveId = () => _setActiveId('0');

export const _getActiveId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('activeId')
      .then(id => {
        if (id) resolve(id);
        else resolve(null);
      })
      .catch(reject);
  });
};

export const _addToRecentTx = (hash, accountId) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('recent_transactions').then(val => {
      if (!val) {
        const newData = [{ hash, id: accountId }];

        AsyncStorage.setItem('recent_transactions', JSON.stringify(newData))
          .then(() => resolve())
          .catch(reject);
      } else {
        let data = [...JSON.parse(val)];

        if (data.length === 3) data.shift();

        data = [...data, { hash, id: accountId }];

        AsyncStorage.setItem('recent_transactions', JSON.stringify(data))
          .then(() => resolve())
          .catch(reject);
      }
    });
  });
};

export const _getRecentTx = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('recent_transactions')
      .then(val => {
        if (!val) resolve([]);

        resolve([...JSON.parse(val)]);
      })
      .catch(reject);
  });
};
