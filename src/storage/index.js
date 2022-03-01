import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';

export const _saveAccount = (pw, name, address, seedPhrase) => {
  const id = uuid();
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('accounts').then(accounts => {
      if (!accounts || accounts === null || typeof accounts === 'undefined')
        AsyncStorage.setItem('accounts', JSON.stringify([{ id, pw, name, address, seedPhrase }]))
          .then(() => resolve(id))
          .catch(reject);
      else
        AsyncStorage.setItem(
          'accounts',
          JSON.stringify([...JSON.parse(accounts), { id, pw, name, address, seedPhrase }])
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
          if (!account) reject(new Error('Account with specified ID not found'));
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
