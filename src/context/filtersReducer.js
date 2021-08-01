export const SET_TYPE = 'SET_TYPE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_PERFORMANCE = 'SET_PERFORMANCE';
export const SET_BLOCK_SIZE = 'SET_BLOCK_SIZE';
export const SET_STATUS = 'SET_STATUS';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_TILES = 'SET_TILES';

export function filtersReducer(state, action) {
  if (action.type === SET_TYPE) {
    return {
      ...state,
      type: action.payload,
    };
  }
  if (action.type === SET_CATEGORY) {
    return {
      ...state,
      category: action.payload,
    };
  }
  if (action.type === SET_PERFORMANCE) {
    return {
      ...state,
      performance: action.payload,
    };
  }
  if (action.type === SET_BLOCK_SIZE) {
    return {
      ...state,
      blockSize: action.payload,
    };
  }
  if (action.type === SET_STATUS) {
    return {
      ...state,
      status: action.payload,
    };
  }
  if (action.type === SET_VOLUME) {
    return {
      ...state,
      volume: action.payload,
    };
  }
  if (action.type === SET_TILES) {
    return {
      ...state,
      tiles: action.payload,
    };
  }
  return state;
}
