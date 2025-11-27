import React, { createContext, useContext, useMemo } from 'react';
import { espoApi } from '../api/espoApi';

const ApiContext = createContext(espoApi);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useMemo(() => espoApi, []);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
