import { useEffect, useState } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import ContainerDimensions from 'react-container-dimensions';
import { formatData } from '../utils/utils';
import { useFilters } from '../context/filtersContext';
import { API_URI } from '../utils/constants';

const TreeMapGraph = () => {
  const { state: filters } = useFilters();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetch(`${API_URI}`)
      .then(res => res.json())
      .then(data => setResponse(data))
      .catch(err => console.log(err));
  }, []);

  const formattedData = formatData(response, filters);

  return (
    <ContainerDimensions>
      {({ width }) => (
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
          width={width}
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
                    {otherData?.price_change_percentage_1h_in_currency.toFixed(
                      3
                    )}
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
      )}
    </ContainerDimensions>
  );
};

export default TreeMapGraph;
