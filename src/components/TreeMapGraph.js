import { useEffect, useState } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { calculateFontSize, formatData } from '../utils/utils';
import { useFilters } from '../context/filtersContext';
import { API_URI } from '../api';
import { useCoinsTokens } from '../context/coinsTokensContext';
import { useSliderSettings } from '../context/sliderSettingsContext';
import { useCategories } from '../context/categoriesContext';
import { Loader } from 'semantic-ui-react';
import CustomModal from './CustomModal';

const TreeMapGraph = () => {
  //for modal
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const { state: filters, actions } = useFilters();
  const { setSettings } = useSliderSettings();
  const { coins, tokens } = useCoinsTokens();
  const [data, setData] = useState([]);
  const { categories: CATEGORY, setCategories } = useCategories();
  const [responses, setResponses] = useState({
    ...Object.keys(CATEGORY).reduce(
      (acc, key) => ({
        ...acc,
        [CATEGORY[key]]: [],
      }),
      {}
    ),
  });

  useEffect(() => {
    const category = CATEGORY[filters.category];
    if (!responses[category] || responses[category].length === 0) {
      setLoading(true);
      let url = API_URI;
      if (filters.category !== 'None') {
        url = `${url}&category=${category}`;
      }
      fetch(`${url}`)
        .then(res => res.json())
        .then(jsonData => {
          if (jsonData instanceof Array) {
            setResponses(prev => ({
              ...prev,
              [category]: jsonData,
            }));
          } else {
            // show error message
            setOpen(true);
          }
        })
        .catch(error => console.log({ error }))
        .finally(() => setTimeout(() => setLoading(false), 500));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CATEGORY, filters.category, responses, setCategories]);

  useEffect(() => {
    const category = CATEGORY[filters.category];
    setData(responses[category] ?? []);
  }, [responses, filters.category, CATEGORY]);

  useEffect(() => {
    setSettings(prevSettings => {
      let volumes = [];
      if (filters.blockSize === 'market cap') {
        volumes = data.map(item => item.market_cap);
      } else {
        volumes = data.map(item => item.total_volume);
      }

      const min = Math.min(...volumes);
      const max = Math.max(...volumes);

      if (volumes.length) {
        actions.setVolume([min, max]);
      }

      return {
        ...prevSettings,
        start: [min, max],
        min,
        max,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSettings, filters.blockSize]);

  const formattedData = formatData(data, filters, coins, tokens);

  useEffect(() => {
    const tags = Array.from(document.getElementsByTagName('text'));
    tags.forEach(tag => {
      const parent = tag.parentElement;
      const dimensions = parent.getBoundingClientRect();
      tag.style.fontSize = `${calculateFontSize(dimensions)}px`;
    });
  });

  if (loading) {
    return (
      <div
        style={{
          minHeight: '50%',
          minWidth: '50%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Loader active={true} />
      </div>
    );
  }

  return (
    <>
      {open && <CustomModal open={open} setOpen={setOpen} />}

      <ResponsiveTreeMap
        data={formattedData}
        identity="id"
        value="value"
        colors={params => params.data.color}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelTextColor="#ffffff"
        borderColor={{ from: 'color' }}
        leavesOnly={true}
        nodeOpacity={0.5}
        label={function (coinInfo) {
          return coinInfo.data.name;
        }}
        labelSkipSize={20}
        orientLabel={false}
        tooltip={({ node }) => {
          const otherData = node?.data?.otherData;
          if (otherData) {
            return (
              <div
                style={{ color: '#ffffff' }}
                className="TreeMapGraph__Tooltip"
              >
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
    </>
  );
};

export default TreeMapGraph;
