import { useEffect, useState } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { calculateFontSize, formatData } from '../utils/utils';
import { useFilters } from '../context/filtersContext';
import { API_URI } from '../api';
import { useCoinsTokens } from '../context/coinsTokensContext';
import { CATEGORY } from '../utils/constants';
import { useSliderSettings } from '../context/sliderSettingsContext';

const TreeMapGraph = () => {
  const { state: filters } = useFilters();
  const { setSettings } = useSliderSettings();
  const { coins, tokens } = useCoinsTokens();
  const [data, setData] = useState([]);
  const [responses, setResponses] = useState({
    [CATEGORY.ETF]: [],
    [CATEGORY['Meme Tokens']]: [],
    [CATEGORY['Privacy Coins']]: [],
  });

  useEffect(() => {
    // requesting api for data
    const URLS = {
      [CATEGORY.ETF]: API_URI,
      [CATEGORY['Meme Tokens']]: `${API_URI}&category=meme-token`,
      [CATEGORY['Privacy Coins']]: `${API_URI}&category=privacy-coins`,
    };

    Object.keys(URLS).forEach(key => {
      const url = URLS[key];
      fetch(`${url}`)
        .then(res => res.json())
        .then(data =>
          setResponses(prev => ({
            ...prev,
            [key]: data,
          }))
        )
        .catch(error => console.error({ error }));
    });
  }, []);

  useEffect(() => {
    const category = CATEGORY[filters.category];
    setData(responses[category]);
  }, [responses, filters.category]);

  useEffect(() => {
    setSettings(prevSettings => {
      const volumes = data.map(item => item.total_volume);
      const min = Math.min(...volumes);
      const max = Math.max(...volumes);
      return {
        ...prevSettings,
        start: min,
        min,
        max,
      };
    });
  }, [data, setSettings]);

  const formattedData = formatData(data, filters, coins, tokens);

  useEffect(() => {
    const tags = Array.from(document.getElementsByTagName('text'));
    tags.forEach(tag => {
      const parent = tag.parentElement;
      const dimensions = parent.getBoundingClientRect();
      tag.style.fontSize = `${calculateFontSize(dimensions)}px`;
    });
  });

  return (
    <ResponsiveTreeMap
      data={formattedData}
      identity="name"
      value="value"
      colors={params => {
        return params.data.color;
      }}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelTextColor="#ffffff"
      borderColor={{ from: 'color' }}
      leavesOnly={true}
      nodeOpacity={0.5}
      label={function (e) {
        return e.id;
      }}
      labelSkipSize={20}
      orientLabel={false}
      tooltip={({ node }) => {
        const otherData = node?.data?.otherData;
        if (otherData) {
          return (
            <div style={{ color: '#ffffff' }} className="TreeMapGraph__Tooltip">
              <h4>{otherData?.name}:</h4>
              <p>Current Price: ${otherData?.current_price}</p>
              <p>Market Cap: ${otherData?.market_cap}</p>
              <p>
                Price Change (24hr): $
                {otherData?.price_change_percentage_1h_in_currency.toFixed(3)}
              </p>
            </div>
          );
        } else {
          return (
            <strong style={{ color: node.color }}>
              {node.name}: {node.formattedValue}
            </strong>
          );
        }
      }}
      theme={{
        tooltip: {
          container: {
            background: '#282829',
          },
        },
      }}
    />
  );
};

export default TreeMapGraph;
