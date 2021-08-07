import { useEffect, useState } from 'react';
import { ResponsiveTreeMapHtml } from '@nivo/treemap';
import { calculateFontSize, formatData } from '../utils/utils';
import { useFilters } from '../context/filtersContext';
import { API_URI } from '../api';
import { useCoinsTokens } from '../context/coinsTokensContext';
import { useSliderSettings } from '../context/sliderSettingsContext';
import { useCategories } from '../context/categoriesContext';
import { Loader } from 'semantic-ui-react';
import CustomModal from './CustomModal';
import { BILLION, PERFORMANCE } from '../utils/constants';

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
          if (jsonData instanceof Array && jsonData.length) {
            setResponses(prev => ({
              ...prev,
              [category]: jsonData,
            }));
          } else {
            // show error message
            setOpen(true);
          }
        })
        .catch(error => {
          console.log({ error });
        })
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

      const min = Math.min(...volumes) / BILLION;
      const max = Math.max(...volumes) / BILLION;

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
    const { current_price } = value.data.otherData ?? {};
    const price_change =
      value.data.otherData[PERFORMANCE[filters.performance]] ?? {};

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize,
            textShadow: '0.015em 0.015em 0 rgb(50 49 54 / 28%)',
            alignItems: 'center',
            marginBottom: '20%',
          }}
        >
          {value.data.name.toUpperCase()}
        </div>
        <div>${current_price}</div>

        {price_change ? (
          <div
            style={{
              fontSize: changeFontSize,
              textShadow: '0.015em 0.015em 0 rgb(50 49 54 / 28%)',
              alignItems: 'center',
            }}
          >
            {price_change > 0 ? '+' : null}
            {Math.round(price_change * 100) / 100}%
          </div>
        ) : null}
      </div>
    );
  };

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
        labelTextColor={formattedData.children.length ? '#ffffff' : '#373737'}
        borderColor={{ from: 'color' }}
        leavesOnly={true}
        nodeOpacity={1}
        label={e => {
          console.log(e);
          return e.data.otherData ? <FormatLabel value={e} /> : 'No Data Found';
        }}
        labelSkipSize={40}
        tile="binary"
        orientLabel={false}
        borderWidth={1}
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
              alignContent: 'flex-start',
            },
          },
        }}
      />
    </>
  );
};

export default TreeMapGraph;
