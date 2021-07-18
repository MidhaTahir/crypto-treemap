import { createContext, useContext, useEffect, useState } from 'react';
import { COIN_TOKEN_IDENTIFIER_API } from '../api';

const CoinsTokensContext = createContext();

export const useCoinsTokens = () => useContext(CoinsTokensContext);

export const CoinsTokensProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetch(`${COIN_TOKEN_IDENTIFIER_API}`)
      .then(response => response.json())
      .then(jsonResponse => {
        const _coins = [],
          _tokens = [];
        jsonResponse?.forEach(entity => {
          if (entity.type === 'coin') {
            _coins.push(entity.symbol?.toLowerCase());
          }
          if (entity.type === 'token') {
            _tokens.push(entity.symbol?.toLowerCase());
          }
        });
        setCoins(_coins);
        setTokens(_tokens);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <CoinsTokensContext.Provider value={{ coins, tokens }}>
      {children}
    </CoinsTokensContext.Provider>
  );
};
