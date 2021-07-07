import { createContext, useContext, useReducer } from 'react';
import {
  filtersReducer,
  SET_TYPE,
  SET_PERFORMANCE,
  SET_BLOCK_SIZE,
  SET_STATUS,
} from './filtersReducer';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, {
    type: 'Coins',
    performance: '1 day',
    blockSize: 'market cap',
    status: 'all',
  });

  // actions
  const setType = type =>
    dispatch({
      type: SET_TYPE,
      payload: type,
    });

  const setPerformance = performance =>
    dispatch({
      type: SET_PERFORMANCE,
      payload: performance,
    });

  const setBlockSize = blockSize =>
    dispatch({
      type: SET_BLOCK_SIZE,
      payload: blockSize,
    });

  const setStatus = status =>
    dispatch({
      type: SET_STATUS,
      payload: status,
    });

  const value = {
    state,
    actions: {
      setType,
      setPerformance,
      setBlockSize,
      setStatus,
    },
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
