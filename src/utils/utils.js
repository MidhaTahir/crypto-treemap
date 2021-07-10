import { BLOCK_SIZE, PERFORMANCE, STATUS } from './constants';

const computeBlockColor = (performance, status) => {
  const red = 'hsl(0, 100%, 50%)',
    green = 'hsl(99, 100%, 20%)';
  if (status === STATUS.all) {
    return performance > 0 ? green : red;
  }
  if (status === STATUS.gainers) {
    return green;
  }
  if (status === STATUS.losers) {
    return red;
  }
};

export function formatData(data, filters) {
  let { blockSize, performance, status } = filters;

  blockSize = BLOCK_SIZE[blockSize];
  performance = PERFORMANCE[performance];

  // filtering data acc to status(gainers/losers)
  const filteredData = data.filter(coinInfo => {
    if (status === STATUS.all) {
      return true;
    }
    if (status === STATUS.gainers) {
      return coinInfo.price_change_percentage_24h > 0;
    }
    if (status === STATUS.losers) {
      return coinInfo.price_change_percentage_24h < 0;
    }
  });

  return {
    name: 'CoinTreeMap',
    children: filteredData.map((coinInfo, coinIdx) => {
      const blockColor = computeBlockColor(coinInfo[performance], status);

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
