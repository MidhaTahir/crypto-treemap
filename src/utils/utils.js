export function formatData(data, filterField) {
  return {
    name: 'CoinTreeMap',
    children: data.map((coinInfo, coinIdx) => {
      const color =
        coinInfo.price_change_percentage_1h_in_currency > 0
          ? 'hsl(99, 100%, 20%)'
          : 'hsl(0, 100%, 50%)';
      return {
        id: coinIdx,
        name: coinInfo.symbol.toUpperCase(),
        value: coinInfo[filterField],
        otherData: coinInfo,
        color,
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
