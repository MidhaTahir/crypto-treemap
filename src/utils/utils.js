import {
  BILLION,
  BLOCK_SIZE,
  PERFORMANCE,
  STATUS,
  TILES,
  TYPE,
} from './constants';

const greenRanger = value => {
  if (value > 35) {
    return 'hsl(100, 100%, 18%)';
  } else if (value > 25 && value <= 35) {
    return 'hsl(100, 70%, 29%)';
  } else if (value > 4 && value <= 25) {
    return 'hsl(100, 70%, 36%)';
  } else {
    return 'hsl(100, 70%, 45%)';
  }
};

const redRanger = val => {
  const value = Math.abs(val);
  if (value > 35) {
    return 'hsl(0, 100%, 20%)';
  } else if (value > 25 && value <= 35) {
    return 'hsl(0, 100%, 40%)';
  } else if (value > 4 && value <= 25) {
    return 'hsl(0, 80%, 60%)';
  } else {
    return 'hsl(0, 80%, 70%)';
  }
};

const computeBlockColor = (performance, status) => {
  if (status === STATUS.all) {
    return performance > 0 ? greenRanger(performance) : redRanger(performance);
  }
  if (status === STATUS.gainers) {
    return greenRanger(performance);
  }
  if (status === STATUS.losers) {
    return redRanger(performance);
  }
};

export function formatData(data = [], filters, coins = [], tokens = []) {
  let { blockSize, performance, status, type, tiles } = filters;

  blockSize = BLOCK_SIZE[blockSize];
  performance = PERFORMANCE[performance];
  type = TYPE[type];

  data = data.slice(0, TILES[tiles]);

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
    .filter(coinInfo => {
      // volume
      const [min, max] = filters.volume;
      const blockValue =
        blockSize === 'market_cap'
          ? coinInfo.market_cap
          : coinInfo.total_volume;
      // console.log({ blockValue });
      return blockValue >= min * BILLION && blockValue <= max * BILLION;
    });

  return {
    name: 'No data',
    children: filteredData.map((coinInfo, coinIdx) => {
      const blockColor = computeBlockColor(coinInfo[performance], status);

      return {
        id: coinInfo.id,
        name: `${coinInfo.symbol.toUpperCase()}`,
        value: coinInfo[blockSize],
        otherData: coinInfo,
        color: blockColor,
      };
    }),
    // .filter(coinInfo => coinInfo.value !== 0),
  };
}

export const arrayToObject = array => {
  return array.map(value => ({
    key: value,
    text: value,
    value: value,
  }));
};

export const calculateFontSize = width => {
  const baseSize = 13;
  let textLength = (width * 12) / 100;
  let fontSize;
  if (textLength >= baseSize) {
    fontSize = 2 * textLength - baseSize;
    return fontSize;
  } else {
    fontSize = textLength + baseSize;
    return fontSize;
  }
};
