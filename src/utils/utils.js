export function formatData(data) {
  return {
    name: 'Coin Tree Map',
    children: data.map((coinInfo, coinIdx) => {
      const color =
        coinInfo.price_change_percentage_1h_in_currency > 0
          ? 'hsl(99, 100%, 20%)'
          : 'hsl(0, 100%, 50%)';
      return {
        id: coinIdx,
        name: coinInfo.name,
        value: coinInfo.market_cap,
        color,
      };
    }),
  };
}
