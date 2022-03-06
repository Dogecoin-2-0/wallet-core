import React, { createContext, useContext, useEffect, useState } from 'react';
import { _getActiveId, _resetActiveId, _setActiveId } from '../storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    _getActiveId().then(id => {
      if (!id || (typeof id === 'string' && id === '0')) setAuth(false);
      else setAuth(true);
    });
  }, []);

  const signIn = id => {
    _setActiveId(id).then(() => {
      setAuth(true);
    });
  };

  const signOut = () => {
    _resetActiveId().then(() => {
      setAuth(false);
    });
  };

  return <AuthContext.Provider value={{ isAuth, signOut, signIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
