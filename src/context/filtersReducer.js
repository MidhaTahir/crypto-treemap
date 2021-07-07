export const SET_TYPE = 'SET_TYPE';
export const SET_PERFORMANCE = 'SET_PERFORMANCE';
export const SET_BLOCK_SIZE = 'SET_BLOCK_SIZE';
export const SET_STATUS = 'SET_STATUS';

export function filtersReducer(state, action) {
  if (action.type === SET_TYPE) {
    return {
      ...state,
      type: action.payload,
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
  return state;
}
