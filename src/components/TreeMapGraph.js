import { useEffect, useState } from 'react';
import {  ResponsiveTreeMapHtml } from '@nivo/treemap';
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


  const FormatLabel = ({ value }) => {
    const fontSize = calculateFontSize(value.width);
    const priceFontSize = fontSize / 4;
    const changeFontSize = priceFontSize / 2;
    //let fontSizeH = fontSize / 4
    const { current_price, price_change_percentage_1h_in_currency, change_percentage_24h_in_currency, price_change_percentage_7d_in_currency, price_change_percentage_14d_in_currency, price_change_percentage_30d_in_currency}= value.data.otherData;
    return (
      <div style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
      <div style={{ fontSize, textShadow: '0.015em 0.015em 0 rgb(50 49 54 / 28%)', alignItems: 'center' }}>{value.data.name.toUpperCase()}</div>
      <div>${current_price}</div>
      {price_change_percentage_1h_in_currency ? <div style={{ fontSize: changeFontSize, textShadow: '0.015em 0.015em 0 rgb(50 49 54 / 28%)', alignItems: 'center' }}>{price_change_percentage_1h_in_currency > 0 ? '+' : null}{Math.round(price_change_percentage_1h_in_currency * 100) / 100}%</div> : null}
      </div>
    )
}

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
      <ResponsiveTreeMapHtml
        data={formattedData}
        identity="id"
        value="value"
        colors={params => params.data.color}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelTextColor="#ffffff"
        borderColor={{ from: 'color' }}
        leavesOnly={true}
        nodeOpacity={0.5}
        label={(e) => e.data.name ? <FormatLabel value={e} /> : 'No Data Found'}
        labelSkipSize={40}
        tile="binary"
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
                  background: 'black',
                  alignContent: 'flex-start'
              },
          }
      }}
      />
    </>
  );
};

export default TreeMapGraph;
