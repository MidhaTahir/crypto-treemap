import { BLOCK_SIZE, CATEGORY, PERFORMANCE, STATUS, TYPE } from './constants';

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

export function formatData(data, filters, coins = [], tokens = []) {
  let { blockSize, performance, status, type, category } = filters;

  blockSize = BLOCK_SIZE[blockSize];
  performance = PERFORMANCE[performance];
  type = TYPE[type];
  category = CATEGORY[category];

  // filtering data acc to status(gainers/losers)
  const filteredData = data
    .filter(coinInfo => {
      if (status === STATUS.all) {
        return true;
      }
      if (status === STATUS.gainers) {
        return coinInfo.price_change_percentage_24h > 0;
      }
      if (status === STATUS.losers) {
        return coinInfo.price_change_percentage_24h < 0;
      }
      return false;
    })
    .filter(coinInfo => {
      if (type === TYPE['Coins and Tokens']) {
        return true;
      }
      if (type === TYPE.Coins) {
        return (
          typeof coins.find(coinSymbol => coinSymbol === coinInfo.symbol) !==
          'undefined'
        );
      }
      if (type === TYPE.Tokens) {
        return (
          typeof tokens.find(tokenSymbol => tokenSymbol === coinInfo.symbol) !==
          'undefined'
        );
      }
      return false;
    })
    .filter(coinInfo => coinInfo.total_volume >= filters.volume);

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

export const calculateFontSize = ({ width, height }) => {
  // const area = width * height;
  const min = 11;
  const max = 70;
  const fontSize = (width * 16) / 100;
  return fontSize < min ? min : fontSize > max ? max : fontSize;
};
