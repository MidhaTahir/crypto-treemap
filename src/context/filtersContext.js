import { createContext, useContext, useReducer } from 'react';
import {
  filtersReducer,
  SET_TYPE,
  SET_CATEGORY,
  SET_PERFORMANCE,
  SET_BLOCK_SIZE,
  SET_STATUS,
  SET_VOLUME,
  SET_TILES,
} from './filtersReducer';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, {
    type: 'Coins and Tokens',
    category: 'None',
    tiles: '50',
    performance: '1 day',
    blockSize: 'market cap',
    status: 'all',
    volume: [0, 0],
  });

  // actions
  const setType = type =>
    dispatch({
      type: SET_TYPE,
      payload: type,
    });

  const setCategory = category =>
    dispatch({
      type: SET_CATEGORY,
      payload: category,
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

  const setVolume = value =>
    dispatch({
      type: SET_VOLUME,
      payload: value,
    });

  const setTiles = value =>
    dispatch({
      type: SET_TILES,
      payload: value,
    });

  const value = {
    state,
    actions: {
      setType,
      setCategory,
      setPerformance,
      setBlockSize,
      setStatus,
      setVolume,
      setTiles,
    },
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
