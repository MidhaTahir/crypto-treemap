import { BLOCK_SIZE, PERFORMANCE } from './constants';

export function formatData(data, filters) {
  let { blockSize, performance } = filters;

  blockSize = BLOCK_SIZE[blockSize];
  performance = PERFORMANCE[performance];

  return {
    name: 'CoinTreeMap',
    children: data.map((coinInfo, coinIdx) => {
      const blockColor =
        coinInfo[performance] > 0 ? 'hsl(99, 100%, 20%)' : 'hsl(0, 100%, 50%)';

      return {
        id: coinIdx,
        name: coinInfo.symbol.toUpperCase(),
        value: coinInfo[blockSize],
        otherData: coinInfo,
        color: blockColor,
      };
    }),
  };
}

export const arrayToObject = array => {
  return array.map(value => ({
    key: value,
    text: value,
    value: value,
  }));
};
